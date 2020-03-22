const mongoose              = require('mongoose');

const authorizationCodeSchema = new mongoose.Schema({
    code: String,
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    },
    user: {type: mongoose.Schema.Types.ObjectId, default: null}
});

module.exports = mongoose.model('AuthorizationCode', authorizationCodeSchema);
