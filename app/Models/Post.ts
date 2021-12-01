import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
import PostsLike from './PostsLike'
import PostsComment from './PostsComment'

type QueryBuilder = ModelQueryBuilderContract<typeof Post>

export default class Post extends BaseModel {
  public serializeExtras() {
    return {
      likes_count: this.$extras.likes_count,
    }
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public content: string

  @column({ serializeAs: null })
  public userId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => PostsLike)
  public likes: HasMany<typeof PostsLike>

  @hasMany(() => PostsComment)
  public comments: HasMany<typeof PostsComment>

  @beforeCreate()
  public static async generateId(post: Post) {
    if (post.$dirty) {
      post.id = uuidv4()
    }
  }

  public static withUser = scope((query: QueryBuilder) => {
    query.preload('user', (userQuery) => {
      userQuery.preload('profile')
    })
  })

  public static withLikesCount = scope((query: QueryBuilder) => {
    query.withCount('likes')
  })
}
