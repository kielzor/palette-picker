exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary()
      table.string('name')

      table.timestamps(true, true)
    }),

    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.string('hex_one')
      table.string('hex_two')
      table.string('hex_three')
      table.string('hex_four')
      table.string('hex_five')
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('projects.id')

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('palettes')
  ])
};
