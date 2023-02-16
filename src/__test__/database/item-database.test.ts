import 'providers/config'
import pool from 'providers/database-connection'
import { ItemDatabase } from "database/item/items-database";
import { Item, NewItem } from 'models/item/item';
import { BaseMeasurementUnit } from 'models/base-measurement-unit';
import { UserDatabase } from 'database/user-database'


describe('database tests', () => {
    let itemDatabase: ItemDatabase;
    let userDatabase: UserDatabase;
    let userId: string;
    beforeAll(async () => {
        itemDatabase = new ItemDatabase(pool)
        userDatabase = new UserDatabase(pool)
        userId = await userDatabase.createUser('testUser@test.com')
    })

    test('if an item is added to a database', async () => {
        const item: NewItem = {
            "name": "test food",
            "baseMeasurementUnitId": BaseMeasurementUnit.g,
            "quantity": 100,
            "protein": 0.3,
            "calories": 52,
            "carbohydrate": 14,
            "fibre": 2.4,
            "fat": 0.2,
        }

        const addedItem = await itemDatabase.createItem({ ...item, "userId": userId }) as Item;

        expect(addedItem?.id).toBeTruthy()

        for (const k in item) {
            if (Object.prototype.hasOwnProperty.call(item, k)) {
                const key = k as keyof NewItem
                expect(addedItem[key]).toBe(item[key])
            }
        }
    })

    test('if item is updated correctly', async () => {
        const item: NewItem = {
            "name": "test food",
            "baseMeasurementUnitId": BaseMeasurementUnit.g,
            "quantity": 100,
            "protein": 100,
            "calories": 100,
            "carbohydrate": 100,
            "fibre": 100,
            "fat": 100,
        }

        const updates = {
            name: 'updated name',
            BaseMeasurementUnit: BaseMeasurementUnit.ml,
            "quantity": 101,
            "protein": 101,
            "calories": 101,
            "carbohydrate": 101,
            "fibre": 101,
            "fat": 101,
        }

        const newItem = await itemDatabase.createItem({
            ...item,
            userId
        })
        console.log("🚀 ~ file: item-database.test.ts:70 ~ test ~ newItem", newItem)

        expect(newItem).toBeTruthy()

        if (newItem) {
            const updatedItem = await itemDatabase.updateItem({
                ...newItem,
                ...updates,
            })

            console.log("🚀 ~ file: item-database.test.ts:78 ~ test ~ updatedItem", updatedItem)

            expect(updatedItem).toMatchObject(updates)
        }



    })

    afterAll(async () => {
        await pool.end()
    })
})