require('dotenv').config()

const server = require('./api/server')


const PORT = process.env.PORT || 4994

server.listen(PORT, () => {
  console.log(`*^^* ~~API IS ALIVE ON PORT ${PORT}~~ *^^*`)
})