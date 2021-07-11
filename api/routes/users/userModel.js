const db = require('../../../data/dbConfig');



const findAdmin = () => {
	return db('admin as a').join('newUser as u', 'a.user_id', 'u.id').select('a.id as admin_id', 'u.id as user_id', 'u.*');
};

const findUser = () => {
	return db('consumer as c')
		.join('newUser as u', 'c.user_id', 'u.id')
		.select('c.id as consumer_id', 'u.id as user_id', 'u.*');
};

const findUserById = (id) => {
	return db('consumer as c')
		.where('c.id', id)
		.join('newUser as u', 'c.user_id', '=', 'u.id')
		.select('c.id as consumer_id', 'u.id as user_id', 'u.*')
		.first();
};

const findUserInfoByUserId = (id) => {
	return db('consumer as c')
		.where('c.id', id)
		.join('newUser as u', 'c.user_id', '=', 'u.id')
		.select('u.username', 'c.*')
		.first();
};

const removeUser = (id) => {
	return db('consumer').where({ id }).del();
};

module.exports = {
	findAdmin,
	findUser,
	findUserById,
	findUserInfoByUserId,
	removeUser,
};