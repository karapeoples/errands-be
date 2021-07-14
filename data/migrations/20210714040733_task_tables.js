
exports.up = function(knex) {
  return knex.schema.createTable('tasks', (tbl) => {
			tbl.increments();
			tbl.string('title', 255).notNullable();
			tbl.string('description', 255).notNullable();
      tbl.date('completeBy').notNullable();
      tbl.integer('consumer_id').unsigned().references('id').inTable('consumer').onDelete('CASCADE').onUpdate('CASCADE')
		});
};

exports.down = function(knex) {
return knex.schema.dropTableIfExists('tasks');
};
