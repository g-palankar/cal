import 'providers/config'
import { createMockToken } from '../middlewares/mock-require-registered-user'
import request from 'supertest'
import { UserMessages } from 'controllers/user-controller'
import { StandardResponse } from 'models/standard-response'
import { generateFakeUser } from 'utils/fake-user'
import { createTestApp } from '../providers/test-app-generator'

const fakeUser = generateFakeUser()

describe('user api', () => {
    const [app, dispose] = createTestApp()

    test('new user is registered successfully', async () => {
        const token = createMockToken(fakeUser.email)
        const resp = await request(app.server).post('/users').set('Authorization', token)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toMatchObject({
            message: UserMessages.success
        })
    })

    test('registered user gets an already registered message', async () => {
        const fakeUser2 = generateFakeUser()
        const token = createMockToken(fakeUser2.email)

        await request(app.server).post('/users').set('Authorization', token)

        const resp2 = await request(app.server).post('/users').set('Authorization', token)
        const expectedResp: StandardResponse = {
            message: UserMessages.exists,
        }
        expect(resp2.body).toMatchObject(expectedResp)
    })

    afterAll(async () => {
        await dispose()
    })
})