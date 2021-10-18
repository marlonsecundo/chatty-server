import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { limit, page } = request.all()

    return Post.query().preload('comments').preload('likes').paginate(page, limit)
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
