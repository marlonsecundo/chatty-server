import Env from '@ioc:Adonis/Core/Env'

import { initializeApp, ServiceAccount } from 'firebase-admin/app'
import admin from 'firebase-admin'

initializeApp({
  credential: admin.credential.cert({
    clientEmail: Env.get('FIREBASE_CLIENT_EMAIL'),
    privateKey: Env.get('FIREBASE_PRIVATE_KEY'),
    projectId: Env.get('FIREBASE_PROJECT_ID'),
  } as ServiceAccount),
})
