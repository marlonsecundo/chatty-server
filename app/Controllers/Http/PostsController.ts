import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { limit, page, id } = request.all()

    let query = Post.query()

    if (id) {
      query = query.where({ id })
    }

    query = query
      .preload('likes')
      .withCount('likes')
      .withScopes((scopes) => {
        scopes.withOwnerUser()
      })
      .orderBy('createdAt', 'desc')

    return await query.paginate(page, limit)
  }

  public async store({ auth, request }: HttpContextContract) {
    const { content } = request.all()
    const user = await auth.use('api').authenticate()

    const { id } = await user.related('posts').create({ content })

    const post = Post.query()
      .where({ id })
      .withCount('likes')
      .withScopes((scopes) => {
        scopes.withOwnerUser()
      })
      .first()

    return post
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
