import 'providers/config'
import pool from 'providers/database-connection'
import { ItemDatabase } from './items-database'
import { UserDatabase } from 'database/user-database'

const database = new ItemDatabase(pool)
const userDatabase = new UserDatabase(pool)


async function test() {
    await
        await database.__init()
    console.log('done query')
}

test()

