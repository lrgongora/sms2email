const express      = require('express');
      passport     = require('passport');
      router       = express.Router();
      jwt          = require('jsonwebtoken');
      User         = require('../models/user');
      config       = require('../config/variables');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(200).json({"status": "error", "message": error});
    if (info) return res.status(200).json({"status": "info", "message": info});
    req.login(user, {session: false}, function(error) {
        if (error) return res.status(200).json({"status": "error", "message": error});
        let token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({"status" : "success", "user" : user, "token" : token});
    });
  })(req, res);
})


router.post('/register', function(req, res){
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
            res.status(200).json({"status" : "success", "user" : user.username, "token" : token })
          });
        });
      } else {
        return res.status(200).json({"status" : "error", "message" : "User already exists!"});
      }
    }
  })
});

router.get('/logout', function(req, res){
  req.logOut();
  res.status(200).json({"status" : "success", "message" : "logged out"});
})




module.exports = router;