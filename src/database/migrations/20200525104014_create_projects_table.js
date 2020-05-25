
exports.up = function(knex) {
  return knex.schema.createTable("projects", function(table) {
    table.increments("id")
    table.text("title")

    //? relacionamento
    //! 1 - n (um user tem n projetos)
    table.integer("user_id")
    .references("users.id")
    .notNullable()
    .onDelete("CASCADE") // Apagar user apaga todos os seus projects

    table.timestamps(true, true)
  });
};

exports.down = knex => knex.schema.dropTable("projects"); //? maneira moderna no js 
