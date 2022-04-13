import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserTokensController {
  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const { fcmToken } = request.all()

    user.merge({ fcmToken })

    await user.save()

    return user.fcmToken !== null
  }
}
