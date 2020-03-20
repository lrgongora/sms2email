var express = require('express');
    router   = express.Router();
    User     = require('../models/user');
    passport = require('passport');

router.post('/', function(req, res){
  User.find({email: req.body.email}, function(err, user){
    console.log(user);
    if(err){
      console.log(err);
    } else {
      if(user == ""){
        var newUser = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phoneNumber : req.body.phoneNumber}
        User.register(new User(newUser), req.body.password, function(err, user){
          if(err){
            console.log(err);
              return res.status(200).json({"status" : "error", "message" : err});
          }
          passport.authenticate('local')(req, res, function(){
            let token = jwt.sign(user.toJSON(), config.secret);
            res.status(200).json({"status" : "success", "user" : user.username, "token" : "JWT " + token })
          });
        });
      } else {
        return res.status(200).json({"status" : "error", "message" : "User already exists!"});
      }
    }
  })
});

module.exports = router;
