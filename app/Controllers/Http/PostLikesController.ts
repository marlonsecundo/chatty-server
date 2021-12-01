import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostsLike from 'App/Models/PostsLike'

export default class PostLikesController {
  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const { posts_id: postId } = request.params()

    return PostsLike.firstOrCreate({ postId, userId: user.id })
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const { posts_id: postId } = request.params()

    const postLike = await PostsLike.query().where({ postId }).andWhere({ userId: user.id }).first()

    if (postLike === null) return

    return postLike.delete()
  }
}