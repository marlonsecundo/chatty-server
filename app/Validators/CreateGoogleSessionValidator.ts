import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGoogleSessionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    appRedirectUri: schema.string(),
  })

  public messages = {}
}
