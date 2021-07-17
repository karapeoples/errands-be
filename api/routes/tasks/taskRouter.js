const [express, Tasks] = [require('express'), require('./taskModel')]
const router = express.Router()


router.get('/:task_id', (req, res) => {
	const { id } = req.params;

	Tasks.findById(id).then((errand) => {
		res.status(200).json(errand);
	});
});


router.put('/:Task_id',  (req, res) => {
	const { id } = req.params;
	const body = req.body;

	Tasks.update(id, body).then((errand) => {
		res.status(200).json({ message: 'The Errand was Updated with the following Info', body });
	});
});

router.delete('/:task_id', (req, res) => {
	const { id } = req.params;
	Tasks.findById(id).then((errand) => {
		errand
			? Tasks.remove(id).then((deleted) => {
					deleted ? res.status(200).json({ success: `Errand with ID ${id} has been removed`, info: errand }) : null;
			  })
			: null;
	});
});

module.exports = router;