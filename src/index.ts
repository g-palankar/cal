import 'providers/config'
import pool from './providers/database-connection'
import { App } from "./providers/app"
import { createRequireRegisteredUserMiddleware, getUserInfo } from 'middlewares/require-registered-user'
import { UserDatabase } from 'database/user-database'

const app = new App()
const userDatabase = new UserDatabase(pool)
const requireRegisteredAuthMiddleware = createRequireRegisteredUserMiddleware(userDatabase, getUserInfo)
app.init(pool, getUserInfo, requireRegisteredAuthMiddleware)
app.start()
