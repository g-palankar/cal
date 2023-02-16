import mysql from 'mysql2/promise'

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME, MYSQL_DB_PORT } = process.env

const connectionConfig: mysql.ConnectionOptions = {
    host: MYSQL_DB_HOST,
    port: parseInt(MYSQL_DB_PORT || '0'),
    user: MYSQL_DB_USER,
    password: MYSQL_DB_PASSWORD,
    multipleStatements: true,
    decimalNumbers: true,
}

const pool = mysql.createPool(connectionConfig)

export default pool