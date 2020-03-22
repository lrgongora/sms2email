var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    middleware = require('../middleware/middleware');
    User          = require('../models/user');



  router.get('/:id', function(req, res){
      let code = req.params.id;
      User.findOne({authorizationCode : code}, function(err, foundUser){
          if(err){
              console.log(err);
              return res.status(200).json({"status" : "error", "message" : err})
          } else if(foundUser === null){
              console.log("Not found!")
              return res.status(200).json({"status" : "fail", "message" : "User not found!"})
          } else {
              foundUser.isActive = true;
              return res.status(200).json({"status" : "fail", "success" : "Successfully activated user!"})
          }
      })
});

module.exports = router;
