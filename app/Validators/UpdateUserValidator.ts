import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const alphaNumberWithUndercore = RegExp('^[a-zA-Z0-9_]*$')
const alphaNumber = RegExp('^[a-zA-Z0-9 ]*$')

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    userId: this.ctx.auth.user?.id,
  })

  public schema = schema.create({
    username: schema.string({ escape: true, trim: true }, [
      rules.regex(alphaNumberWithUndercore),
      rules.unique({ table: 'users', column: 'username', whereNot: { id: this.refs.userId } }),
    ]),
    profile: schema.object().members({
      name: schema.string({ escape: true, trim: true }, [rules.regex(alphaNumber)]),
      description: schema.string(),
    }),
  })

  public messages = {
    'username.unique': 'Username not available',
  }
}
