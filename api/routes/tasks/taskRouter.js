const [express, Tasks] = [require('express'), require('./taskModel')]
const router = express.Router()

router.get('/', (req, res) => {
	Tasks.find()
		.then((errands) => {
			res.status(200).json(errands);
		})
		.catch((err) => {
			res.status(500).json({ message: 'There was an error on the Backend with the Database' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	Tasks.findById(id).then((errand) => {
		res.status(200).json(errand);
	});
});

router.post('/',  (req, res) => {
	Tasks.add(req.body)
		.then((errand) => {
			res.status(201).json({ message: 'Success A New Errand was Created', errand });
		})
		.catch((err) => {
			res.status(500).json({error: err.message, note: 'There was an error on the Backend with the Database' });
		});
});

router.put('/:id',  (req, res) => {
	const { id } = req.params;
	const body = req.body;

	Tasks.update(id, body).then((errand) => {
		res.status(200).json({ message: 'The Errand was Updated with the following Info', body });
	});
});

router.delete('/:id', (req, res) => {
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