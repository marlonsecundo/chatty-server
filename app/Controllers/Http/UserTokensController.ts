import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { messaging } from 'firebase-admin'

export default class UserTokensController {
  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const { fcmToken } = request.all()

    user.merge({ fcmToken })

    await user.save()

    console.log({ fcmToken: user.fcmToken })

    return user.fcmToken !== null
  }
}
