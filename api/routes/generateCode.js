var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    middleware = require('../middleware/middleware');
    authorizationCode = require('../models/authorizationCode');
    randomatic      = require('randomatic');



  router.get('/', middleware.isAdmin, function(req, res){
      let code = randomatic('Aa0', 10);
      authorizationCode.create({code : code}, function(err, newCode){
          if(err){
              res.status(200).json({"status": "error", "message" : err});
          } else {
              res.send({"code" : code})
          }
      })
});

module.exports = router;