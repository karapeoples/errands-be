exports.up = (knex) => {
	return knex.schema
		.createTable('newUser', (tbl) => {
			tbl.increments();
			tbl.string('username', 255).notNullable().unique();
			tbl.string('password', 255).notNullable();
			tbl.string('role', 10).notNullable();
		})
		.createTable('admin', (tbl) => {
			tbl.increments();
			tbl.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE');
		})
		.createTable('consumer', (tbl) => {
			tbl.increments();
			tbl.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE');
		})
		.createTable('tasks', (tbl) => {
			tbl.increments();
			tbl.string('title', 255).notNullable();
			tbl.string('description', 255).notNullable();
			tbl.date('completeBy').notNullable();
			tbl.integer('consumer_id').unsigned().references('id').inTable('consumer').onDelete('CASCADE').onUpdate('CASCADE');
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTableIfExists('tasks')
		.dropTableIfExists('consumer')
		.dropTableIfExists('admin')
		.dropTableIfExists('newUser');
};
