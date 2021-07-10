const [express, helmet, cors, morgan, auth, authRouter, userRouter] = [require('express'), require('helmet'), require('cors'), require('morgan'), require('./routes/auth/restrictiveMiddleware'), require('./routes/auth/authRouter'), require('./routes/users/userRouter')];
const server = express();
server.use(helmet(), morgan('dev'), cors(), express.json());
server.use('/api/welcome', authRouter)
server.use('/api/users', auth, userRouter)

// SEE IF API IS UP
server.get('/', (req, res) => {
	res.status(200).json('Welcome to The Errands Backend By Kara');
});

module.exports = server;
