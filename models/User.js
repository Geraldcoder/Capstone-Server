const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please provide name'],
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, 'please provide a valid email'],
		minlength: 10,
		maxlength: 50,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'please provide a secure password'],
	},
})

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createUser = function () {
	return jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LT,
	})
}

UserSchema.methods.comparePassword = async function (userPassword) {
	const verified = await bcrypt.compare(userPassword, this.password)
	return verified
}

module.exports = mongoose.model('user', UserSchema)
