import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async update({ request, auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()

    const {
      username,
      profile: { birth, name, description },
    } = request.all()

    await user.load('profile')

    user.merge({ username })

    await user.save()

    user.profile.merge({ birth, name, description })

    await user.profile.save()

    return {
      username,
      profile: {
        name,
        birth,
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
