import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Profile from 'App/Models/Profile'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { limit, page } = request.all()

    return await Post.query()
      .preload('user', (userQuery) => {
        userQuery.select(['username']).preload('profile')
      })
      .withCount('comments')
      .withCount('likes')
      .paginate(page, limit)
  }

  public async store({ auth, request }: HttpContextContract) {
    const { content } = request.all()
    const user = await auth.use('api').authenticate()

    return user.related('posts').create({ content })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
