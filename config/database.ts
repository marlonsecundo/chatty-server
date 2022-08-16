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
  // DATABASE_URL_PATTERN
  // postgres://user:password@host:port/databse
  // see more in https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku

  const [, userPROD, passwordPROD, hostPROD, portPROD, databasePROD] = Env.get('DATABASE_URL')
    .replace('\n', '')
    .split('postgres://')
    .join(',')
    .split(':')
    .join(',')
    .split('@')
    .join(',')
    .split('/')
    .join(',')
    .split(',')

  host = hostPROD
  port = Number(portPROD)
  user = userPROD
  password = passwordPROD
  database = databasePROD
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
  pgConfig.connection!['ssl'] = {
    rejectUnauthorized: false,
  }
}

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: pgConfig,
  },
}

export default databaseConfig
