import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexPostLikeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number([rules.greaterThanZero(), rules.integer()]),
    limit: schema.number([rules.greaterThanZero(), rules.integer()]),
    params: schema.object().members({
      posts_id: schema.string({}, [rules.uuid()]),
    }),
  })

  public messages = {}
}
