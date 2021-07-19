const [express, bcryptjs, jwt, { jwtSecret }, regUser] = [
	require('express'),
	require('bcryptjs'),
	require('jsonwebtoken'),
	require('./secret'),
	require('./authModel'),
];

const router = express.Router();

const generateToken = (user) => {
	const payload = {
		user_id: user.id,
		username: user.username,
		role: user.role,
	};

	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, jwtSecret, options);
};

router.post('/register', (req, res, next) => {
	const { username, password, role } = req.body;
	const rounds = process.env.BCRYPT_ROUNDS;
	const hash = bcryptjs.hashSync(password, rounds);
	const userObject = {
		username,
		role,
		password: hash,
	};
	return regUser
		.add(userObject)
		.then((newUser) => {
			let roleInfo = {};
			let userRole;
			switch (newUser.role) {
				case 'consumer':
					roleInfo = {
						user_id: newUser.id,
					};
					userRole = regUser.addUser(roleInfo);
					break;
				case 'admin':
					roleInfo = {
						user_id: newUser.id,
					};
					userRole = regUser.addAdmin(roleInfo);
					break;
			}
			userRole.then((userInfo) => {
				(token = generateToken(userObject)), res.status(201).json({ createdUser: newUser, roleId: userInfo, token: token });
			});
		})
		.catch((err) => {
			res.status(500).json({ errorMsg: err.message, message: 'Was not able to register user' });
		});
});

router.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if(username && password) {
		regUser
			.findBy({ username })
			.then((user) => {
				if (user && bcryptjs.compareSync(password, user.password)) {
					const roleInfo = regUser.findTypeById(user.id, user.role);
					roleInfo.then((userInfo) => {
						const token = generateToken(user);
						res.status(201).json({ user: user, roleInfo: userInfo, token: token });
					});
				} else {
					res.status(401).json({ message: 'Invalid Login Credentials' });
				}
			})
			.catch((err) => {
				res.status(500).json({ errorMsg: err.message, message: 'Was not able to login user' });
			});
	}
});

module.exports = router;
