import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig, PostgreConfig } from '@ioc:Adonis/Lucid/Database'

let host
let port
let user
let password
let database

if (Env.get('NODE_ENV') === 'development') {
  host = Env.get('DEV_PG_HOST')
  port = Env.get('DEV_PG_PORT')
  user = Env.get('DEV_PG_USER')
  password = Env.get('DEV_PG_PASSWORD', '')
  database = Env.get('DEV_PG_DB_NAME')
} else if (Env.get('NODE_ENV') === 'production') {
  host = Env.get('PROD_PG_HOST')
  port = Env.get('PROD_PG_PORT')
  user = Env.get('PROD_PG_USER')
  password = Env.get('PROD_PG_PASSWORD', '')
  database = Env.get('PROD_PG_DB_NAME')
}

let pgConfig: PostgreConfig = {
  client: 'pg',
  connection: {
    host,
    port,
    user,
    password,
    database,
  },
  migrations: {
    naturalSort: true,
    disableRollbacksInProduction: true,
  },
  healthCheck: false,
  debug: false,
}

if (Env.get('NODE_ENV') === 'production') {
  pgConfig.connection!['ssl'] = false
}

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: pgConfig,
  },
}

export default databaseConfig
