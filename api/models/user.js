const mongoose              = require('mongoose');
      passport              = require('passport');
      localStrategyMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  password: String,
  isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(localStrategyMongoose);

module.exports = mongoose.model('User', userSchema);
