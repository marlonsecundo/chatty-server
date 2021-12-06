import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  hasManyThrough,
  HasManyThrough,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Post from './Post'
import PostsLike from './PostsLike'
import { v4 as uuidv4 } from 'uuid'

export default class User extends BaseModel {
  public serializeExtras() {
    return {
      postLikes_count: Number(this.$extras.postLikes_count ?? 0),
      posts_count: Number(this.$extras.posts_count ?? 0),
    }
  }
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public email: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column()
  public username: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasManyThrough([() => PostsLike, () => Post])
  public postLikes: HasManyThrough<typeof PostsLike>

  @beforeCreate()
  public static async generateId(user: User) {
    if (user.$dirty) {
      user.id = uuidv4()
    }
  }
}
