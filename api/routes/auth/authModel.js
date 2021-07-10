const db = require('../../../data/dbConfig');



const find = () => {
	return db('newUser').select('id', 'username').orderBy('id');
};

const findBy = (filter) => {
	return db('newUser').where(filter).orderBy('id');
};
const findById = (id) => {
	return db('newUser').where({ id }).first();
};

const findTypeBy = (filter, type) => {
	return db(type).select('*').where(filter).first();
};

const findTypeById = (id, type) => {
	return db('newUser').join(type, `newUser.id = ${type}.user_id`).where('newUser.id', id).select(`${type}.*`).first();
};

const add = (user) => {
	let [id] = db('newUser').insert(user, 'id').returning('id')
	return findById(id);
};

const addUser = (user) => {
 	const id	= db('consumer').insert(user, 'id').returning('id')
	return db('consumer').select('*').where({ id }).first();
};
const addAdmin = (user) => {
	const id = db('admin').insert(user, 'id').returning('id')
		return db('admin').select('*').where({ id }).first();
};

module.exports = {

	find,
	findBy,
	findById,
	findTypeBy,
	findTypeById,
	add,
	addUser,
	addAdmin,
};