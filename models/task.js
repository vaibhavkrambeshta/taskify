const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Optional for authentication
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;