const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: { type: String, required: true, unique: true },
  list: { type: Array, default: [] }
});

module.exports = mongoose.model('Board', BoardSchema);
