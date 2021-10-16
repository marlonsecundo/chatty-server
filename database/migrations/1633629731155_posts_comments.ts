import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsComments extends BaseSchema {
  protected tableName = 'posts_comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('content')
      table
        .uuid('post_id')
        .references('posts.id')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('user_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
