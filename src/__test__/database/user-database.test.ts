import 'providers/config'
import pool from 'providers/database-connection';
import { UserDatabase } from "database/user-database";

describe('User database', () => {
    let userDatabase: UserDatabase;

    beforeAll(async () => {
        userDatabase = new UserDatabase(pool)
    })

    test('user is created properly', async () => {
        const loginId = 'testuser@testdomain.com'
        const createUserRes = await userDatabase.createUser(loginId)
        expect(createUserRes).toBeTruthy()

        const savedId = await userDatabase.getUserId(loginId)
        expect(savedId).toBe(createUserRes)
    })

    afterAll(async () => {
        await pool.end()
    })
})