import express, { RequestHandler, Express } from 'express'
import { Server } from 'http'
import { getUserInfo, UserInfoGetter } from '../middlewares/require-registered-user'
import { UserDatabase } from '../database/user-database'
import { UserController } from '../controllers/user-controller'
import { Pool } from 'mysql2/promise'
import { httpErrorHandler } from '../middlewares/http-error-handler'
import { ItemDatabase } from '../database/item/items-database'
import { OpenIdConnectUser } from 'models/user'
import { ItemController } from 'controllers/item-controller'
import pool from './database-connection'

export class App {
    app: Express
    private _server?: Server
    userDatabase?: UserDatabase
    requireAuthMiddleWare?: RequestHandler
    itemDatabase?: ItemDatabase

    constructor() {
        this.app = express()
        this.registerMiddlewares()
    }

    get server() {
        return this.app
    }

    async init(pool: Pool,
        getUserInfo: UserInfoGetter,
        requireRegisteredUserMiddleware: RequestHandler) {
        const itemDatabase = new ItemDatabase(pool)
        const userDatabase = new UserDatabase(pool)

        this.registerUserRoute(userDatabase, getUserInfo)
        this.registerItemRoute(itemDatabase, requireRegisteredUserMiddleware)
        this.registerHttpErrorHandler()

        return this.app
    }

    initializeApp() {

    }

    registerUserRoute(userDatabase: UserDatabase, userInfo?: (token: string) => Promise<OpenIdConnectUser>) {
        const userInfoFn = userInfo || getUserInfo
        const userController = new UserController(userDatabase, userInfoFn)
        this.app.use('/users', userController.getRouter())
    }

    registerItemRoute(itemDatabase: ItemDatabase, requireRegisteredUserMiddleware: RequestHandler) {
        const itemController = new ItemController(itemDatabase)
        this.app.use('/items', requireRegisteredUserMiddleware, itemController.getRouter())
    }

    registerMiddlewares() {
        const cors = require('cors')
        this.app.use(cors())
        this.app.use(express.json())
    }

    registerRoutes(userDatabase: UserDatabase,
        userInfo: (token: string) => Promise<OpenIdConnectUser>,
        requireRegisteredUserMiddleware: RequestHandler,
        itemDatabase: ItemDatabase,
    ) {
        this.registerUserRoute(userDatabase, userInfo)
        this.registerItemRoute(itemDatabase, requireRegisteredUserMiddleware)
        this.registerHttpErrorHandler()
    }

    registerHttpErrorHandler() {
        this.app.use(httpErrorHandler)
    }

    start() {
        const PORT = process.env.PORT
        this.app.listen(PORT, () => {
            console.log('listening on port => ', PORT)
        })
    }

    async stop() {
        await pool.end()
        this._server?.close()
    }

}