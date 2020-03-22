const express      = require('express');
      passport     = require('passport');
      router       = express.Router();
      jwt          = require('jsonwebtoken');
      nodemailer   = require('nodemailer');
      User         = require('../models/user');
      AuthorizationCode = require('../models/authorizationCode');
      config       = require('../config/variables');
      middleware   = require('../middleware/middleware');
      randomatic   = require('randomatic');
      sendEmail    = require('../helper/sendEmail');

router.post('/login', middleware.isUserActive, (req, res, next) => {
    if(!req.body.username || !req.body.password) {
       return res.status(200).json({"status": "error", "message": "Please, fill all the fields!"});
    }
    passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(200).json({"status": "error", "message": error});
    if (info) return res.status(200).json({"status": "info", "message": info});
    req.login(user, function(error) {
        if (error) return res.status(200).json({"status": "error", "message": error});
        let token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({"status" : "success", "user" : user, "token" : token});
    });
  })(req, res);
})


router.post('/register', middleware.verifyCode, function(req, res){
    if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber) {
       return res.status(200).json({"status": "error", "message": "Please, fill all the fields!"});
    }
  User.find({email: req.body.email}, function(err, user){
    console.log(user);
    if(err){
      console.log(err);
    } else {
      if(user){
        var newUser = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phoneNumber : req.body.phoneNumber}
        User.register(new User(newUser), req.body.password, function(err, user){
          if(err){
            console.log(err);
            return res.status(200).json({"status" : "error", "message" : err});
          }
          let transporter = nodemailer.createTransport(emailConfig);
          let code = randomatic("Aa0", 10);
          AuthorizationCode.create({code : code}, function(err, newCode){
              if(err){
                  return res.status(200).json({"status" : "error", "message" : err});
              } else {
                  newCode.user = user._id;
                  newCode.save();
                  user.isAdmin = true;
                  user.save();
                  sendEmail(user.email, "New user verification", "verifyEmail.ejs", code);
                  return res.status(200).json({"status" : "success", "message" : "Please, check your email for verification code"});
              }
          })
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