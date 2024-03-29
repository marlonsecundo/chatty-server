import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { base64 } from '@ioc:Adonis/Core/Helpers'
import BadGoogleUserException from 'App/Exceptions/BadGoogleUserException'
import User from 'App/Models/User'
import CreateGoogleSessionValidator from 'App/Validators/CreateGoogleSessionValidator'

interface State {
  appRedirectUri: string
}
export default class GoogleSessionsController {
  public async redirect({ ally, request }: HttpContextContract) {
    const { appRedirectUri } = await request.validate(CreateGoogleSessionValidator)

    const state: State = { appRedirectUri }

    let encodedState = base64.urlEncode(JSON.stringify(state))

    return ally
      .use('google')
      .stateless()
      .redirect((redirectRequest) => {
        redirectRequest
          .scopes(['userinfo.profile', 'userinfo.email', 'user.gender.read', 'user.birthday.read'])
          .param('state', encodedState)
      })
  }

  public async callback({ ally, request, auth, response }: HttpContextContract) {
    const { email, name, avatarUrl } = await ally.use('google').stateless().user()

    const { state: encodedState } = request.all()

    const state: State = JSON.parse(base64.urlDecode(encodedState))

    try {
      let user = await User.findBy('email', email)

      if (!email) {
        throw new BadGoogleUserException('Email not found', 404, 'NOT_FOUND')
      }

      if (!user) {
        user = await User.create({ email })

        user.related('profile').create({ name, imageUrl: avatarUrl ?? undefined })
      }

      const token = await auth.use('api').generate(user, { expiresIn: '1days' })

      response.redirect().toPath(`${state.appRedirectUri}?token=${token.token}&`)
    } catch (err) {
      throw err
    }
  }

  public async getUser({ auth }: HttpContextContract) {
    const { id } = await auth.use('api').authenticate()

    return User.query()
      .where({ id })
      .withCount('postLikes')
      .withCount('posts')
      .preload('profile')
      .first()
  }

  public async logout({ auth }: HttpContextContract) {
    return auth.logout()
  }
}
