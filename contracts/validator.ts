declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    integer(): Rule
    greaterThanZero(): Rule
  }
}
