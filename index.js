const dotenv = require('dotenv')
dotenv.config();

const server = require('./api/server');

const PORT = process.env.PORT ;

server.listen(PORT, () => {
	console.log(`*^^* ~~API IS ALIVE ON PORT ${PORT}~~ *^^*`);
});
