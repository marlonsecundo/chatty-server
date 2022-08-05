import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexPostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number([rules.greaterThanZero(), rules.integer()]),
    limit: schema.number([rules.greaterThanZero(), rules.integer()]),
    userId: schema.string.optional({}, [rules.uuid()]),
    id: schema.string.optional({}, [rules.uuid()]),
  })

  public messages = {}
}
