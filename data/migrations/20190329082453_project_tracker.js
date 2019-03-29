
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl
            .increments()
        tbl
            .string('name', 128)
            .notNullable()
        tbl
            .string('description')
            .notNullable()
        tbl
            .boolean('completed')
            .notNullable()
 
    })
    .createTable('actions', tbl => {
        tbl
            .increments('')
        tbl
            .string('description')
            .notNullable()
        tbl
            .string('notes')
            .notNullable()
        tbl
            .boolean('completed')
            .notNullable()
     
    })
  
};


exports.down = function(knex, Promise) {
    return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('actions')
      .dropTableIfExists('contexts')
      .dropTableIfExists('actioncontext');
  };
