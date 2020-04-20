const mongoose              = require('mongoose');
      passport              = require('passport');
      localStrategyMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    password: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    passwordChange: {
        type: Boolean,
        default: false
    },
    authorizationCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorizationCode'
    },
});

userSchema.plugin(localStrategyMongoose);

module.exports = mongoose.model('User', userSchema);