import { Pool } from "mysql2/promise";
import pool from "providers/database-connection";
import { uuid } from "utils/uuid";
import { MysqlDatabase } from "./mysql-database";


export class UserDatabase extends MysqlDatabase {
    constructor(pool: Pool) {
        super(pool)
    }

    __init() {
        return this.query({
            sql: `drop table if exists user;
            create table if not exists user (
            loginId varchar(100) primary key,
            id varchar(36) not null unique
        )`})
    }

    __dropTable() {
        return this.query({ sql: 'drop table if exists user' })
    }

    async createUser(loginId: string) {
        await this.query({
            sql: `insert into user (loginId, id)
            values (?, ?)`,
            values: [loginId, uuid()]
        })
        const newUserId = await this.getUserId(loginId)
        if (!newUserId) throw Error('Could not create a user')
        return newUserId
    }

    getUserId(loginId: string): Promise<string | null> {
        return this.query({
            sql: `select loginId, id from user where loginId = ?`,
            values: [loginId]
        }).then(res => res.length ? res[0].id : null)
    }
}
