const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true, unique: true },
  order: { type: String },
  description: { type: String },
  assignee: { type: String, required: true },
  list: { type: Array, default: [] }
});

module.exports = mongoose.model('Task', TaskSchema);
