const db = require('../../../data/dbConfig');

const find = () => {
	return db('newUser');
};

const findById = (id) => {
	return db('newUser').where({ id }).first();
};

const findBy = (filter) => {
	return db('newUser').where(filter).first();
};

const findTypeBy = (filter, type) => {
	return db(type).select('*').where(filter).first();
};

const findTypeById = (id, type) => {
	return db('newUser')
		.join(type, 'newUser.id', '=', `${type}.user_id`)
		.where('newUser.id', id)
		.select(`${type}.*`)
		.first();
};

const add = (user) => {
	return db('newUser')
		.insert(user, 'id')
		.then((id) => {
			return findById(id);
		});
};

const addAdmin = (user) => {
	return db('admin')
		.insert(user, 'id')
		.then((id) => {
			return db('admin').select('*').where({ id }).first();
		});
};

const addUser = (user) => {
	return db('consumer')
		.insert(user, 'id')
		.then((id) => {
			return db('consumer').select('*').where({ id }).first();
		});
};

module.exports = {
	add,
	addAdmin,
	addUser,
	find,
	findBy,
	findById,
	findTypeBy,
	findTypeById,
};
