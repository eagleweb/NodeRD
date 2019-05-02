const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: { type: String, required: true, unique: true },
  order: { type: String },
  task: { type: Array, default: [] },
  board: { type: Array, default: [] }
});

module.exports = mongoose.model('List', ListSchema);
