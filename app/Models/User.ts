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
} from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Post from './Post'
import PostsLike from './PostsLike'

export default class User extends BaseModel {
  public serializeExtras() {
    console.log(this.$extras)

    return {
      postLikes_count: this.$extras.postLikes_count,
      posts_count: this.$extras.posts_count,
    }
  }
  @column({ isPrimary: true, serializeAs: null })
  public id: number

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
}
