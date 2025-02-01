require('dotenv').config()
const express = require('express')
const app = express()

// extra Security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const tasks = require('./routes/tasks')
const auth = require('./routes/auth')

const connectDBX = require('./db/Xnect')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/AuthMiddleware')

app.set('trust proxy', 1)
app.use(express.json())
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth', auth)
app.use('/api/v1/tasks', authMiddleware, tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 300
const start = async () => {
	try {
		await connectDBX(process.env.MONGO_URI)
		console.log(`Server running on port ${port}`)
		app.listen(port)
	} catch (error) {
		console.error(error)
	}
}

start()
