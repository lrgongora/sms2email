var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    path         = require('path'),
    middleware = require('../middleware/middleware');
    User          = require('../models/user');
    AuthorizationCode  = require('../models/authorizationCode');



  router.get('/:id', function(req, res){
      let code = req.params.id;
      AuthorizationCode.findOne({code : code}, function(err, foundCode){
          console.log(foundCode)
          if(err){
              console.log(err);
              return res.status(200).json({"status" : "error", "message" : err})
          } else if(foundCode === null){
              console.log("Not found!")
              return res.status(200).json({"status" : "fail", "message" : "Code not found!"})
          } else {
              User.findById({"_id" : foundCode.user}, function(err, foundUser){
                if(err){
              console.log(err);
              return res.status(200).json({"status" : "error", "message" : err})
          } else if(foundUser === null){
              console.log("Not found!")
              return res.status(200).json({"status" : "fail", "message" : "User not found!"})
          } else {
              foundUser.isActive = true;
              foundUser.save();
              res.redirect('/#/login');
          }
              })
          }
      })
});

module.exports = router;
