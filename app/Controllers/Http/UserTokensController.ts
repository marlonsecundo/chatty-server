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

  public async teste() {
    const message = {
      data: {
        score: '850',
        time: '2:45',
      },
      token:
        'eUEcF27VRIWUqS4k6sWkwe:APA91bE9ZdeDX6wUEfyZXcCawUgXgtTegt3nxBkgLavpnzbvajRnNqSfiuAbO72oNP6_FBIQ183LpKhMGwg2qJPUQ5dzBbn9-OpxtjSALOisEciUlK6TESP7MXzm8sZW_NrsUJQFrNS2',
    }

    console.log('FSDfdsf')

    try {
      const response = await messaging().send(message)
      console.log('Successfully sent message:', response)

      return response
    } catch (error) {
      console.log({ error })

      return error
    }
  }
}
