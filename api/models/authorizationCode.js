const mongoose              = require('mongoose');

const authorizationCodeSchema = new mongoose.Schema({
    code: String,
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

module.exports = mongoose.model('AuthorizationCode', authorizationCodeSchema);
