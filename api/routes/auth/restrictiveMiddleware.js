const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secret')

module.exports = (req, res, next) => {
	const { authorization } = req.headers


	if (authorization) {
		jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
			if (err) {
					return res.status(401).json({ error: err.message, note: 'Not Authorized Invalid Creds' });
			} else {
				req.decodedToken = decodedToken;
				next()
				}
			})
	} else {
		return res.status(400).json({ error: err.message, note: 'Please provide an username and password' })
	}

}