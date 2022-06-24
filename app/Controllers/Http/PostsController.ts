import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import DestroyPostValidator from 'App/Validators/DestroyPostValidator'
import IndexPostValidator from 'App/Validators/IndexPostValidator'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { page, limit, userId, id } = await request.validate(IndexPostValidator)

    let query = Post.query()

    if (id) {
      query = query.where({ id })
    }

    if (userId) {
      query = query.where({ userId })
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
    const { content } = await request.validate(CreatePostValidator)

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

  public async destroy({ request, auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()

    const {
      params: { id },
    } = await request.validate(DestroyPostValidator)

    const post = await Post.findOrFail(id)

    if (post.userId === user.id) {
      return post.delete()
    }

    return
  }
}
