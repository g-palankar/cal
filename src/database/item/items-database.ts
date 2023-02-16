import { Pool } from "mysql2/promise";
import { Item, NewItem } from "../../models/item/item";
import { uuid } from "../../utils/uuid";
import { MysqlDatabase } from "../mysql-database";
import { createBaseMeasurementUnitTableQuery, createItemTableQuery, createMeasurementUnitTableQuery, dropTablesQuery, insertStandardUnitQuery as insertBaseMeasurementUnitQuery, insertStandardUnitQuery } from "./setup-queries";

export class ItemDatabase extends MysqlDatabase {
    constructor(pool: Pool) {
        super(pool)
    }


    async __init() {
        const resQuery = `${dropTablesQuery}
            ${createBaseMeasurementUnitTableQuery}
            ${insertStandardUnitQuery}
            ${createItemTableQuery}
            ${createMeasurementUnitTableQuery}`
        await this.query({ sql: resQuery })
    }

    async __dropTables() {
        await this.query({ sql: dropTablesQuery })
    }

    async updateItem(item: Item) {
        const sql = `update item set
        name=?,
        baseMeasurementUnitId=?,
        quantity=?,
        calories=?,
        protein=?,
        carbohydrate=?,
        fibre=?,
        fat=?
        where id=?`
        await this.query({
            sql, values: [
                item.name,
                item.baseMeasurementUnitId,
                item.quantity,
                item.calories,
                item.protein,
                item.carbohydrate,
                item.fibre,
                item.fat,
                item.id,
            ]
        })

        return this.getItem(item.id)
    }

    async createItem(item: NewItem & { userId: string }) {
        const id = uuid()
        const sql = `insert into item (id, name, baseMeasurementUnitId, quantity, calories, protein, carbohydrate, fibre, fat, userId)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        await this.query({
            sql,
            values: [
                id,
                item.name,
                item.baseMeasurementUnitId,
                item.quantity,
                item.calories,
                item.protein,
                item.carbohydrate,
                item.fibre,
                item.fat,
                item.userId,
            ]
        })

        return this.getItem(id)
    }

    getItem(id: string): Promise<Item | null> {
        const sql = 'select id, name, baseMeasurementUnitId, quantity, protein, calories, carbohydrate, fibre, fat from item where id = ?'
        return this.query<Item[]>({ sql, values: [id] }).then(res => res.length ? res[0] : null)
    }

}


//create table
// create table items (
// 	id varchar(255) primary key,
//     name varchar(50) not null,
//     byUser varchar(255),
//     mesurementUnit varchar(10) not null,
//     quantity int not null,
//     protein int not null,
//     energy int not null,
//     carbohydrates int not null,
//     fibre int not null,
//     fat int not null
// )

// 'CREATE TABLE `measurementUnit` (
//     `id` varchar(36) NOT NULL,
//     `symbol` varchar(10) DEFAULT NULL,
//     `name` varchar(50) DEFAULT NULL,
//     `factor` decimal(10,2) DEFAULT NULL,
//     `baseUnitId` varchar(10) DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     KEY `baseMeasurementUnitId_FK` (`baseUnitId`),
//     CONSTRAINT `measurementUnit_ibfk_1` FOREIGN KEY (`baseUnitId`) REFERENCES `baseMeasurementUnit` (`id`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'