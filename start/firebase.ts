/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { initializeApp, ServiceAccount } from 'firebase-admin/app'
import admin from 'firebase-admin'

import credentials from '../chatty-firebase-adminsdk.json'

initializeApp({
  credential: admin.credential.cert({
    clientEmail: credentials.client_email,
    privateKey: credentials.private_key,
    projectId: credentials.project_id,
  } as ServiceAccount),
})
