import { UserDatabase } from "database/user-database"
import { Request, Response, NextFunction } from "express"
import { unAuthorizedErr } from "middlewares/require-registered-user"
import { User } from "models/user"

export function createMockToken(loginId: string) {
    if (!loginId) throw new Error('Login Id is required')
    return `Bearer ${loginId}`
}

export function resolveLoginId(mockBearerToken: string) {
    return mockBearerToken?.split('Bearer ')[1]
}

export function createMockRequireRegisteredUserMiddleware(userDatabase: UserDatabase) {

    return async function addUserObject(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        if (!req.headers.authorization) return next(unAuthorizedErr)
        const loginId = resolveLoginId(req.headers.authorization)
        if (!loginId) return next(unAuthorizedErr)

        const userId = await userDatabase.getUserId(loginId)
        if (!userId) return next(unAuthorizedErr)

        const user: User = {
            id: userId,
            given_name: '',
            family_name: '',
            loginId,
            email: loginId,
        }
        req.user = user
        next()
    }
}