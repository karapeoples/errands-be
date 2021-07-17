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

const add = (task, id) => {
  db('tasks as t')
			.join('consumer as c', 't.id', '=', `c.id`)
			.where('t.consumer_id', 'c.id', id)
			.select(`c.id`)
  let taskObj = {
    title: task.title,
    description: task.description,
    completeBy: task.completeBy,
    consumer_id: id
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
