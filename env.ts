/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),
  DB_CONNECTION: Env.schema.string(),
  //
  DEV_PG_HOST: Env.schema.string.optional({ format: 'host' }),
  DEV_PG_PORT: Env.schema.number.optional(),
  DEV_PG_USER: Env.schema.string.optional(),
  DEV_PG_PASSWORD: Env.schema.string.optional(),
  DEV_PG_DB_NAME: Env.schema.string.optional(),
  //
  PROD_PG_HOST: Env.schema.string.optional({ format: 'host' }),
  PROD_PG_PORT: Env.schema.number.optional(),
  PROD_PG_USER: Env.schema.string.optional(),
  PROD_PG_PASSWORD: Env.schema.string.optional(),
  PROD_PG_DB_NAME: Env.schema.string.optional(),
  //
  GOOGLE_CLIENT_ID: Env.schema.string(),
  GOOGLE_CLIENT_SECRET: Env.schema.string(),
  GOOGLE_CALLBACK_BASE_URL: Env.schema.string(),
  //
  FIREBASE_CLIENT_EMAIL: Env.schema.string(),
  FIREBASE_PRIVATE_KEY: Env.schema.string(),
  FIREBASE_PROJECT_ID: Env.schema.string(),
})
