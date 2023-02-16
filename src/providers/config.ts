import dotenv from 'dotenv'
import path from 'path'

const env = process.env['NODE_ENV'] || 'dev'
dotenv.config({ path: path.join(__dirname, `../config/.env.${env}`) })
