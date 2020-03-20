const mongoose              = require('mongoose');

const logsSchema = new mongoose.Schema({
  type: String,
  date: {type: Date, default: Date.now()},
  description: String,
});

module.exports = mongoose.model('Logs', logsSchema);
