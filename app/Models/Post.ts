import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
import PostsLike from './PostsLike'
import PostsComment from './PostsComment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
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
}
