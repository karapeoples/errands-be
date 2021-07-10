const [express, bcryptjs, jwt, { jwtSecret },regUser] = [require('express'), require('bcryptjs'), require('jsonwebtoken'), require('./secret'),require('./authModel') ]

const router = express.Router()


const generateToken = (user) => {
	const payload = {
		user_id: user.id,
		username: user.username,
		role: user.role
	};

	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, jwtSecret, options);
};

router.post('/register', (req, res) => {
	const { username, password, role } = req.body;
	const hash = bcryptjs.hashSync(password, 8);
	const userObject = { username, password: hash, role }
	const token = generateToken(userObject)
	let [roleInfo, userRole, newUserId] = [{}, {},]
	let newUser = regUser.add(userObject)
			.then(() => {
			newUserId=newUser.id
			switch (newUser.role) {
				case 'consumer':
					roleInfo = {
						user_id: newUserId,
					}
					userRole = regUser.addUser(roleInfo)
					return userRole

				case 'admin':
					roleInfo = {
						user_id: newUserId,
					}
					userRole = regUser.addAdmin(roleInfo)
						return userRole
				}


					res.status(201).json({ newUser, roleId: userRole, token })
})

		.catch((err) => {
			res.status(500).json({errorMsg: err.message, note: "Was not able to register User"})
})


});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (req.body) {
		regUser
			.findBy({ username })
			.then(([user]) => {
				// compare the password the hash stored in the database
				if (user && bcryptjs.compareSync(password, user.password)) {
					const token = generateToken(user);
					const roleInfo = regUser.findTypeById(user.id, user.role)
					res.status(200).json({ message: 'Welcome to our API', user, token, roleInfo });
				} else {
					res.status(401).json({ message: 'Invalid credentials' });
				}
			})
			.catch((error) => {
				res.status(500).json({ errorMsg: error.message, note: 'Login did not work correctly Please try again!' });
			});
	} else {
		res.status(400).json({
			message: 'please provide username and password',
		});
	}
});

module.exports = router;