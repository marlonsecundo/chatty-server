/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('greaterThanZero', (value, _, options) => {
  if (typeof value !== 'number') {
    return
  }

  if (value <= 0) {
    options.errorReporter.report(
      options.pointer,
      'greaterThanZero',
      'The number must be greater than zero',
      options.arrayExpressionPointer
    )
  }
})

validator.rule('integer', (value, _, options) => {
  if (typeof value !== 'number') {
    return
  }

  if (value !== 1 && value % 2 !== 0) {
    options.errorReporter.report(
      options.pointer,
      'integer',
      'the number must be a integer',
      options.arrayExpressionPointer
    )
  }
})
