const [express, Tasks] = [require('express'), require('./taskModel')];
const router = express.Router();

router.get('/task/:task_id', (req, res) => {
	const { id } = req.params;
	Tasks.findById(id)
		.then((errand) => {
			res.status(200).json(errand);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message, note: 'There is no task information' });
		});
});

router.put('/task/:task_id', (req, res) => {
	const { id } = req.params;
	const body = req.body;

	Tasks.update(id, body)
		.then((errand) => {
			res.status(200).json({ message: 'The Errand was Updated with the following Info', body });
		})
		.catch((err) => {
			res.status(500).json({ error: err.message, note: 'The changes cannot be made right now' });
		});
});

router.delete('/task/:task_id', (req, res) => {
	const { id } = req.params;
	Tasks.findById(id)
		.then((errand) => {
			errand
				? Tasks.remove(id).then((deleted) => {
						deleted ? res.status(200).json({ success: `Errand with ID ${id} has been removed`, info: errand }) : null;
				  })
				: null;
		})
		.catch((err) => {
			res.status(500).json({ error: err.message, note: 'It cannot be deleted' });
		});
});

module.exports = router;
