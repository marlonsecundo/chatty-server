import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { scope } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'
import Profile from 'App/Models/Profile'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { limit, page } = request.all()

    return await Post.query()
      .withScopes((scopes) => {
        scopes.withCounts()
        scopes.withUser()
      })
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)
  }

  public async store({ auth, request }: HttpContextContract) {
    const { content } = request.all()
    const user = await auth.use('api').authenticate()

    const { id } = await user.related('posts').create({ content })

    const post = Post.query()
      .where({ id })
      .withScopes((scopes) => {
        scopes.withCounts()
        scopes.withUser()
      })
      .first()

    return post
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
