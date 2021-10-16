import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadGoogleUserException from 'App/Exceptions/BadGoogleUserException'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class GoogleSessionsController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect((redirectRequest) => {
      redirectRequest.scopes([
        'userinfo.profile',
        'userinfo.email',
        'user.gender.read',
        'user.birthday.read',
      ])
    })
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
    const { email, name, avatarUrl } = await ally.use('google').user()

    try {
      let user = await User.findBy('email', email)

      if (!email) {
        throw new BadGoogleUserException('Email not found', 404, 'NOT_FOUND')
      }

      if (!user) {
        user = await User.create({ email })

        user.related('profile').create({ name, imageUrl: avatarUrl ?? undefined })
      }

      const token = await auth.use('api').generate(user)

      const url = Env.get('REDIRECT_TOKEN_URL')

      response.redirect().toPath(`${url}?token=${token.token}`)
    } catch (err) {
      console.log(err)
    }
  }
}
