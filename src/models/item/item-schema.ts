import * as yup from 'yup'
import { convertToHttpErrorData } from '../../utils/validation-error-converter'
import { ErrorData } from '../errors/error-data'
import { Item, NewItem } from './item'


export const ItemSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    baseMeasurementUnitId: yup.string().required(),
    quantity: yup.number().required(),
    protein: yup.number(),
    calories: yup.number(),
    carbohydrates: yup.number(),
    fibre: yup.number(),
    fat: yup.number(),
})

export const NewItemSchema = ItemSchema.omit(['id'])

export function validateNewItem(item: NewItem): Promise<ErrorData | null> {
    return NewItemSchema.validate(item, { abortEarly: false }).then(() => null).catch(e => {
        console.log('error in item schema ', e)
        return convertToHttpErrorData(e)
    })
}

export function validateItem(item: Item): Promise<ErrorData | null> {
    return ItemSchema.validate(item, { abortEarly: false }).then(() => null).catch(e => {
        return convertToHttpErrorData(e)
    })
} 