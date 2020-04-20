const express    = require('express');
      router     = express.Router();
      bodyParser = require('body-parser'),
      middleware = require('../middleware/default');
      Log        = require('../models/log');


router.get('/', function(req, res) {
    Log.find({}, function(err, logs) {
        if (err || !logs) {
            middleware.logsHandler("error", err.message)
        } else {
            res.send(logs);
        }
    })
});

module.exports = router;


