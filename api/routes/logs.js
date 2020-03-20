var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    middleware = require('../middleware/middleware');
    Logs     = require('../models/logs');


  router.get('/', function(req, res){
      Logs.find({}, function(err, logs){
          if(err || !logs){
            middleware.logsHandler("error", err.message)
          } else {
              res.send(logs);
          }
      })
});

module.exports = router;


