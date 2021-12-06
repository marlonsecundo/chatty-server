import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  column,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
import Post from './Post'

type QueryBuilder = ModelQueryBuilderContract<typeof PostsLike>

export default class PostsLike extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public userId: string

  @column({ serializeAs: null })
  public postId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  public static withUserLikesCount = scope((query: QueryBuilder, user: User) => {
    query.count('*', 'total').where({ userId: user.id })
  })

  @beforeCreate()
  public static async generateId(postsLike: PostsLike) {
    if (postsLike.$dirty) {
      postsLike.id = uuidv4()
    }
  }
}
