const [express, User] = [require('express'), require('./userModel')];
const router = express.Router();

router.get('/admin', (req, res) => {
	User.findAdmin()
		.then(([admins]) => {
			if (!admins) {
				res.status(400).json({ message: 'There are no admins!' });
			} else {
				res.status(200).json(admins);
			}
		})
		.catch((error) => {
			res.status(500).json({ errorMsg: error.message, note: 'There are no admins!' })
		});
});

router.get('/user', (req, res) => {
	User.findUser()
		.then(([users]) => {
			if (!users) {
				res.status(400).json({ message: 'There are no users!' });
			} else {
				res.status(200).json(users);
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no users!' }));
});

router.get('/user/:id', (req, res) => {
	const { id } = req.params;
	User.findUserById(id)
		.then(([users]) => {
			if (!users) {
				res.status(400).json({ message: `No user with the id of ${id}` });
			} else {
				res.status(200).json(users);
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No users with the id of ${id}`,
			}),
		);
});


router.delete('/delete/:id', (req, res, next) => {
	const { id } = req.params;
	User.removeUser(id).then((removed) => {
						removed
							? res.status(200).json({
									message: `Removed Consumer id ${id} from the database`,
							})
							: null;
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `There is no consumer with the id of ${id} to delete`,
			}),
		);
});

module.exports = router