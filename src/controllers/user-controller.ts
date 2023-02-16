import { NextFunction, Request, Response, Router } from "express"
import { OpenIdConnectUser, User } from "models/user"
import { resolvePromise } from "utils/resolve-promise"
import { UserDatabase } from "../database/user-database"
import { HttpError } from "../models/errors/htttp-error"
import { StandardResponse } from "../models/standard-response"

export class UserController {
    private _router = Router()

    constructor(
        private userDatabase: UserDatabase,
        private getUserInfo: (bearer: string) => Promise<OpenIdConnectUser>,
    ) {
        this.setupRoutes()
    }

    setupRoutes() {
        this._router.post('/', this.signup)
        this._router.get('/sample', (req, res, next) => {
            res.json({
                type: "sample"
            })
        })
    }

    getRouter() {
        return this._router
    }

    signup = async (req: Request, res: Response, next: NextFunction) => {
        const [userInfo, error] = await resolvePromise(this.getUserInfo(req.headers.authorization!))
        if (!userInfo || error) return next(new HttpError('Could not fetch user from the auth server', 500))

        const [userId, dbError] = await resolvePromise(this.userDatabase.getUserId(userInfo.email))

        if (userId) {
            const resp: StandardResponse = {
                message: UserMessages.exists
            }
            return res.json(resp)
        }

        try {
            await this.userDatabase.createUser(userInfo.email)
            res.json({
                message: UserMessages.success
            })
        } catch (error) {
            console.log('error', error)
            next(new HttpError('Could not create the user', 500))
        }
    }

}

export const UserMessages = {
    success: 'Signup was successfull',
    exists: 'You have already been registered.'
}
