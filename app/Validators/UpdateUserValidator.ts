import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const alphaNumberWithUndercore = RegExp('^[a-zA-Z0-9_]*$')
const alphaNumber = RegExp('^[a-zA-Z0-9 ]*$')

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ escape: true, trim: true }, [rules.regex(alphaNumberWithUndercore)]),
    profile: schema.object().members({
      birth: schema.date({}, [rules.before('today')]),
      name: schema.string({ escape: true, trim: true }, [rules.regex(alphaNumber)]),
      description: schema.string(),
    }),
  })

  public messages = {}
}
