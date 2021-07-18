const [express, User, Tasks] = [require('express'), require('./userModel'), require('../tasks/taskModel')];
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
			res.status(500).json({ errorMsg: error.message, note: 'There are no admins!' });
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
		.then((users) => {
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

router.get('/user/:consumer_id/tasks', (req, res) => {
	const { consumer_id } = req.params;
	Tasks.findTaskByConsumer(consumer_id)
		.then((errand) => {
			if (!errand) {
				res.status(400).json({ message: `No task for user with the id of ${consumer_id}` });
			} else {
				res.status(200).json(errand);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err.message, note: 'Try again' });
		});
});

router.post('/user/:consumer_id/task', (req, res) => {
	let taskObj = {
		title: req.body.title,
		description: req.body.description,
		completeBy: req.body.completeBy,
		consumer_id: req.params.consumer_id,
	};
	Tasks.add(taskObj)
		.then((errand) => {
			res.status(201).json({ message: 'Success A New Errand was Created', errand });
		})
		.catch((err) => {
			res.status(500).json({ error: err.message, note: 'There was an error on the Backend with the Database' });
		});
});

router.delete('/delete/:id', (req, res, next) => {
	const { id } = req.params;
	User.removeUser(id)
		.then((removed) => {
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

module.exports = router;
