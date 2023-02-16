import { BaseMeasurementUnit } from "../base-measurement-unit";

export interface Item {
    id: string,
    name: string,
    baseMeasurementUnitId: BaseMeasurementUnit,
    quantity: number,
    protein: number,
    calories: number,
    carbohydrate: number,
    fibre: number,
    fat: number,
}

export type NewItem = Omit<Item, 'id'> 
