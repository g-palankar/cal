import { QueryOptions, ResultSetHeader } from "mysql2"
import { Pool } from "mysql2/promise"

export interface Options extends QueryOptions { }

export interface ResultMetadata extends ResultSetHeader { }

export class MysqlDatabase {
    private _conn: Pool

    constructor(conn: Pool) {
        this._conn = conn
    }

    async query<T = any>(opt: Options): Promise<T> {
        const [res, _] = await this._conn.query(opt)
        return res as unknown as T
    }

    isDuplicateError(err: any): boolean {
        return err.code === 'ER_DUP_ENTRY' ? true : false
    }
}