const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secret')

module.exports = (req, res, next) => {
	const { authorization } = req.headers

	authorization
		? jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
			err ? res.status(401).json({ error: 'Not Authorized Invalid Creds' }) : (req.decodedToken = decodedToken)
			next()
		})
		: res.status(400).json({ error: 'Please provide an username and password' })
	
}