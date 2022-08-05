import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfilesSchema extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('birth')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('birth')
    })
  }
}
