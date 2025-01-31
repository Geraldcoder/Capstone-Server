const Task = require('../models/task')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors/customError')

// ----------- ALL TASK -----------------
const getAllTasks = async (req, res, next) => {
	try {
		const tasks = await Task.find({ createdBy: req.user._id }).sort('createdAt')
		res.status(StatusCodes.OK).json({ tasks, amount: tasks.length })
	} catch (error) {
		next(error)
	}
}

// ----------- SINGLE TASK -----------------
const getSingleTask = async (req, res, next) => {
	try {
		const { id: taskID } = req.params
		const task = await Task.findOne({ _id: taskID })
		if (!task) {
			throw new NotFoundError(`No task found with ID: ${taskID}`)
		}
		res.status(StatusCodes.OK).json({ task })
	} catch (error) {
		next(error)
	}
}

// ----------- CREATE TASK -----------------
const createTask = async (req, res, next) => {
	try {
		req.body.createdBy = req.user._id
		const task = await Task.create(req.body)
		res.status(StatusCodes.CREATED).json({ task })
	} catch (error) {
		next(error)
	}
}

// ----------- UPDATE TASK -----------------
const updateTask = async (req, res, next) => {
	try {
		const { id: taskID } = req.params
		const { title, description } = req.body

		if (!title || !description) {
			throw new BadRequestError('Title and description cannot be empty')
		}

		const updatedTask = await Task.findOneAndUpdate(
			{ _id: taskID, createdBy: req.user._id },
			req.body,
			{ new: true, runValidators: true }
		)

		if (!updatedTask) {
			throw new NotFoundError(`No task found with ID: ${taskID}`)
		}

		res.status(StatusCodes.OK).json({ updatedTask })
	} catch (error) {
		next(error)
	}
}

// ----------- DELETE TASK -----------------
const deleteTask = async (req, res, next) => {
	try {
		const { id: taskID } = req.params
		const task = await Task.findOneAndDelete({
			_id: taskID,
			createdBy: req.user._id,
		})

		if (!task) {
			throw new NotFoundError(`No task found with ID: ${taskID}`)
		}

		res
			.status(StatusCodes.OK)
			.json(`Task with id: ${taskID} deleted successfully`)
	} catch (error) {
		next(error)
	}
}

module.exports = {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
}
