const mongoose = require('mongoose')

const connectDBX = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
}

module.exports = connectDBX
