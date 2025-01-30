const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { UnauthorizedError, BadRequestError } = require('../errors/customError')

const register = async (req, res, next) => {
	try {
		const newUser = await User.create({ ...req.body })
		const { name } = newUser
		const token = newUser.createUser()
		res.status(StatusCodes.CREATED).json({ newUser: { name }, token })
	} catch (error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			throw new BadRequestError('please input valid credentials')
		}
		const verUser = await User.findOne({ email })
		if (!verUser) {
			throw new BadRequestError('please input valid credentials')
		}

		const isVer = await verUser.comparePassword(password)
		if (!isVer) {
			throw new UnauthorizedError('invalid password')
		}
		const token = verUser.createUser()
		res
			.status(StatusCodes.OK)
			.json({ verUser: { email: verUser.email }, token })
	} catch (error) {
		next(error)
	}
}

module.exports = { register, login }
