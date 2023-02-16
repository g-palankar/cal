import 'providers/config'
import pool from 'providers/database-connection'
import { UserDatabase } from 'database/user-database'
import { ItemDatabase } from 'database/item/items-database'



async function teardown() {
    // const itemDb = new ItemDatabase(pool)
    // const userDb = new UserDatabase(pool)
    // await itemDb.__dropTables()
    // await userDb.__dropTable()
    await pool.end()
}

export default teardown