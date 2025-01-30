const express = require('express')
const router = express.Router()

const {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/task')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').patch(updateTask).get(getSingleTask).delete(deleteTask)

module.exports = router
