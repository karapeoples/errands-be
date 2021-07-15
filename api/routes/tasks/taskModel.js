const db = require('../../../data/dbConfig');

const find = () => {
	return db('tasks');
};

const findById = (id) => {
	return db('tasks').where({ id }).first();
};

const findByFilter = (filter) =>{
  return db('tasks').where(filter).first()
}

const add = (task) => {
  let consumer = db('tasks as t').join('consumer as c', 't.consumer_id', 'c.id').select('t.consumer_id');
  let taskObj = {
    title: task.title,
    description: task.description,
    completeBy: task.completeBy,
    consumer_id: consumer
  }
   return db('tasks')
    .insert(taskObj)
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
	find,
	findById,
	add,
	update,
	remove,
};
