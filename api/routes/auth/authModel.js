const db = require('../../../data/dbConfig');


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

function find() {
	return db('newUser');
}

function findById(id) {
	return db('newUser').where({ id }).first();
}

function findBy(filter) {
	return db('newUser').where(filter).first();
}

function findTypeBy(filter, type) {
	return db(type).select('*').where(filter).first();
}

async function findTypeById(id, type) {
	user = await db('newUser')
		.join(type, 'newUser.id', '=', `${type}.user_id`)
		.where('newUser.id', id)
		.select(`${type}.*`)
		.first();
	return user;
}

async function add(user) {
	const [id] = await db('newUser').insert(user, 'id');
	return await findById(id);
}

async function addAdmin(user) {
	const [id] = await db('admin').insert(user, 'id');
	const admin = await db('admin').select('*').where({ id }).first();
	return admin;
}

async function addUser(user) {
	const [id] = await db('consumer').insert(user, 'id').returning('id');
	const users = await db('consumer').select('*').where({ id }).first();
	return users;
}