import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateFcmTokenValidator from 'App/Validators/CreateFcmTokenValidator'

export default class UserFCMTokensController {
  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const { fcmToken } = await request.validate(CreateFcmTokenValidator)

    user.merge({ fcmToken })

    await user.save()

    return user.fcmToken !== null
  }
}
