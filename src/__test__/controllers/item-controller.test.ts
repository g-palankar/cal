import 'providers/config'
import { generateFakeUser } from 'utils/fake-user'
import { createMockToken } from '../middlewares/mock-require-registered-user'
import { createTestApp } from '../providers/test-app-generator'
import request from 'supertest'
import { NewItem } from 'models/item/item'
import { BaseMeasurementUnit } from 'models/base-measurement-unit'

describe('testing the item route', () => {
    const fakeUser = generateFakeUser()
    const token = createMockToken(fakeUser.email)
    const [app, dispose] = createTestApp()

    beforeAll(async () => {
        await request(app.server).post('/users').set('Authorization', token)
    })

    test('create new item', async () => {
        const item: NewItem = {
            name: 'test item',
            baseMeasurementUnitId: BaseMeasurementUnit.g,
            quantity: 0,
            protein: 0,
            calories: 0,
            carbohydrate: 0,
            fibre: 0,
            fat: 0
        }

        // await request(app.server).post('/users').set('Authorization', token)

        const itemCreationResponse = await request(app.server).post('/items').set('Authorization', token).send(item)
        expect(itemCreationResponse.statusCode).toBe(200)
        expect(itemCreationResponse.body.data.id).toBeTruthy()
        expect(itemCreationResponse.body.data).toMatchObject(item)
    })

    test('Does not create an item with a missing name', async () => {
        const item: NewItem = {
            name: '',
            baseMeasurementUnitId: BaseMeasurementUnit.g,
            quantity: 0,
            protein: 0,
            calories: 0,
            carbohydrate: 0,
            fibre: 0,
            fat: 0
        }

        const itemCreationResponse = await request(app.server).post('/items').set('Authorization', token).send(item)
        expect(itemCreationResponse.statusCode).toBe(200)
        expect(itemCreationResponse.body.data.id).toBeTruthy()
        expect(itemCreationResponse.body.data).toMatchObject(item)
    })

    afterAll(async () => {
        await dispose()
    })

})
