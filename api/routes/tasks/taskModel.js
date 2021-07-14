const db = require('../../../data/dbConfig');

const find = () => {
	return db('tasks');
};

const findById = (id) => {
	return db('tasks').where({ id }).first();
};



const add = (task) => {
	return db.select('tasks as t','consumer.id as c')
		.insert(task)
		.then((ids) => {
			return findById(ids[0]);
		});
};

const update = (id, changes) => {
	return db('tasks').where({ id }).update(changes);
};

const remove = (id) => {
	return db('tasks').where({ id }).del();
};

module.exports = {
	find,
	findById,
	add,
	update,
	remove,
};
