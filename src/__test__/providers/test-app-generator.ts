import 'providers/config'
import { UserDatabase } from "database/user-database"
import pool from "providers/database-connection"
import { createMockRequireRegisteredUserMiddleware, resolveLoginId } from '../middlewares/mock-require-registered-user'
import { App } from 'providers/app'

const getUserInfo = (bearerToken: string) => {
    const loginId = resolveLoginId(bearerToken)

    return Promise.resolve({
        given_name: '',
        family_name: '',
        email: loginId,
    })
}

const app = new App()
const userDatabase = new UserDatabase(pool)
const requireRegisteredAuthMiddleware = createMockRequireRegisteredUserMiddleware(userDatabase)
app.init(pool, getUserInfo, requireRegisteredAuthMiddleware)

async function dispose() {
    return await pool.end()
}

export function createTestApp(): [App, () => Promise<void>] {
    return [app, dispose]
}
