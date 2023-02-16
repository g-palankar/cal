import { BaseMeasurementUnit } from "../../../models/base-measurement-unit"
import { ErrorData } from "../../../models/errors/error-data"
import { Item, NewItem } from "../../../models/item/item"
import { validateItem, validateNewItem } from "models/item/item-schema"
import '../../../providers/config'

describe('validating a new item', () => {
    const validItem: NewItem = {
        name: 'string',
        baseMeasurementUnitId: BaseMeasurementUnit.g,
        quantity: 0,
        protein: 0,
        calories: 0,
        carbohydrate: 0,
        fibre: 0,
        fat: 0,
    }

    test('valid new Item object', async () => {
        const res = await validateNewItem(validItem)
        expect(res).toBe(null)
    })

    test('item missing required property', async () => {
        const keys: Array<keyof NewItem> = ['baseMeasurementUnitId', 'name', 'quantity']

        for (const k of keys) {
            const newItem = { ...validItem }
            delete newItem[k]
            const error = await validateNewItem(newItem) as ErrorData
            expect(error[k]).toBeTruthy()
        }
    })


})

describe('validating an existing item', () => {
    const existingItem: Item = {
        id: 'abc',
        name: 'string',
        baseMeasurementUnitId: BaseMeasurementUnit.g,
        quantity: 0,
        protein: 0,
        calories: 0,
        carbohydrate: 0,
        fibre: 0,
        fat: 0,
    }

    test('valid item oject', async () => {
        const res = await validateItem(existingItem)
        expect(res).toBe(null)
    })

    test('item with missing fields', async () => {
        const keys: Array<keyof Item> = ['baseMeasurementUnitId', 'name', 'quantity', 'id']

        for (const k of keys) {
            const duplicate = { ...existingItem }
            delete duplicate[k]
            const error = await validateItem(duplicate) as ErrorData
            expect(error[k]).toBeTruthy()
        }
    })

})

