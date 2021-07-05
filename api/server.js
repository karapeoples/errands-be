const express = require('express')
const helmet =require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const server = express()

server.use(helmet(), morgan('dev'), cors(), express.json())




// SEE IF API IS UP
server.get('/', (req, res) => {
  res.status(200).json('Welcome to The TODO Backend By Kara')
})

module.exports = server;