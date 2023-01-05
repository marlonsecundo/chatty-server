import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ShowUserValidator from 'App/Validators/ShowUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async show({ request, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const {
      params: { users_id: userId },
    } = await request.validate(ShowUserValidator)

    const user = await User.query()
      .where({ id: userId })
      .withCount('postLikes')
      .withCount('posts')
      .preload('profile')
      .first()

    return user
  }

  public async update({ request, auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()

    const {
      username,
      profile: { name, description },
    } = await request.validate(UpdateUserValidator)

    await user.load('profile')

    user.merge({ username })

    await user.save()

    user.profile.merge({ name, description })

    await user.profile.save()

    return {
      username,
      profile: {
        name,
        description,
      },
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()

    await auth.use('api').logout()

    return user.delete()
  }
}
