const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors/customError')

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return next(new UnauthorizedError('You need to login first'))
	}

	const token = authHeader.split(' ')[1]
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = { _id: decoded._id, name: decoded.name }
		next()
	} catch (err) {
		return next(new UnauthorizedError('Authorization failed'))
	}
}

module.exports = authMiddleware
