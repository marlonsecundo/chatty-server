import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostsLike from 'App/Models/PostsLike'
import Event from '@ioc:Adonis/Core/Event'
import Post from 'App/Models/Post'
import IndexPostLikeValidator from 'App/Validators/IndexPostLikeValidator'
import CreatePostLikeValidator from 'App/Validators/CreatePostLikeValidator'
import DestroyPostLikeValidator from 'App/Validators/DestroyPostLikeValidator'

export default class PostLikesController {
  public async index({ request }: HttpContextContract) {
    const {
      page,
      limit,
      params: { posts_id: postId },
    } = await request.validate(IndexPostLikeValidator)

    let query = PostsLike.query()

    if (postId) {
      query = query.where({ postId })
    }

    query = query.preload('user', (userQuery) => {
      userQuery.withScopes((scopes) => scopes.withProfilePicture())
    })

    return await query.paginate(page, limit)
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const {
      params: { posts_id: postId },
    } = await request.validate(CreatePostLikeValidator)

    const postLike = await PostsLike.firstOrCreate({ postId, userId: user.id })

    await postLike.load('post', (query) => {
      query.preload('user').withCount('likes')
    })

    const { post } = postLike

    const userPostOwner = post.user

    const likesCount = post.$extras.likes_count

    Event.emit('new:postLike', { userWhoLiked: user, userPostOwner, likesCount, post })
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const {
      params: { posts_id: postId },
    } = await request.validate(DestroyPostLikeValidator)

    const postLike = await PostsLike.query().where({ postId }).andWhere({ userId: user.id }).first()

    if (postLike === null) return

    return postLike.delete()
  }
}
