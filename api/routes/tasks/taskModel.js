const db = require('../../../data/dbConfig');

const findById = (id) => {
	return db('tasks').where({ id }).first();
};

const findTaskByConsumer = (id) => {
	return db('tasks').where('consumer_id', id);
};
const add = (task) => {
	return db('tasks')
		.insert(task)
		.then((ids) => {
			return findById(ids);
		});
};

const update = (id, changes) => {
	return db('tasks').where({ id }).update(changes);
};

const remove = (id) => {
	return db('tasks').where({ id }).del();
};

module.exports = {
	findById,
	findTaskByConsumer,
	add,
	update,
	remove,
};
