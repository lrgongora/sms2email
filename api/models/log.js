const mongoose              = require('mongoose');

const logSchema = new mongoose.Schema({
  type: String,
  date: {type: Date, default: Date.now},
  description: String,
});

module.exports = mongoose.model('Log', logSchema);
