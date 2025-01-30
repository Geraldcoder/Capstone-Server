const { StatusCodes } = require('http-status-codes')

class CustomError extends Error {
	constructor(message) {
		super(message)
	}
}

class BadRequestError extends CustomError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.BAD_REQUEST
	}
}

class NotFoundError extends CustomError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.NOT_FOUND
	}
}

class UnauthorizedError extends CustomError {
	constructor(msg) {
		super(msg)
		this.statusCode = StatusCodes.UNAUTHORIZED
	}
}

module.exports = {
	CustomError,
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
}
