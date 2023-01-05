import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateFcmTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fcmToken: schema.string(),
  })

  public messages = {}
}
