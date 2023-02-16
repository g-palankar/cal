import { Request, Response, NextFunction } from "express"
import axios from 'axios'
import { HttpError } from "../models/errors/htttp-error"
import { UserDatabase } from "../database/user-database"
import { isTokenVerified } from "./is-token-valid"
import { OpenIdConnectUser } from "models/user"

export const unAuthorizedErr = new HttpError('Unauthorized', 401)

export type UserInfoGetter = (bearerToken: string) => Promise<OpenIdConnectUser>

export function getUserInfo(bearerToken: string) {
    if (!bearerToken) throw new Error('Bearer token is required')
    const headers = { Authorization: bearerToken }
    return axios.get('/userinfo', {
        headers,
        baseURL: process.env.AUTH_DOMAIN,
    }).then(resp => {
        const user: OpenIdConnectUser = {
            ...resp.data,
        }
        return user
    })
}

export function createRequireRegisteredUserMiddleware(
    userDatabase: UserDatabase,
    userInfoGetter: UserInfoGetter) {
    return async function addUserObject(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const tokenVerified = await isTokenVerified(req)
            if (!tokenVerified) return next(unAuthorizedErr)
            const user = await userInfoGetter(req.headers.authorization!)
            const id = await userDatabase.getUserId(user.email)

            if (!user || !id) return next(unAuthorizedErr)

            req.user = {
                ...user,
                loginId: user.email,
                id,
            }

            next()

        } catch (error) {
            next(new HttpError('Could not fetch the user', 500))
        }
    }
}
