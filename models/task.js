const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Fields cannot be empty'],
			trim: true,
			maxlength: [20, 'Name should not exceed 20 characters'],
		},
		description: {
			type: String,
			required: [true, 'Fields cannot be empty'],
			trim: true,
			maxlength: [150, 'Description should not exceed 150 characters'],
		},
		deadline: {
			type: Date,
			required: [true, 'Date cannot be empty'],
		},
		priority: {
			type: String,
			required: true,
			Enum: ['Low', 'Medium', 'High'],
			Default: 'low',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'please provide user'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Tasks', TaskSchema)
