import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'

export default class Profile extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column()
  public name: string

  @column.date()
  public birth: DateTime

  @column()
  public description: string

  @column()
  public imageUrl: string

  @column({ serializeAs: null })
  public userId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async generateId(profile: Profile) {
    if (profile.$dirty) {
      profile.id = uuidv4()
    }
  }
}
