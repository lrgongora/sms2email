const mongoose = require('mongoose');
      User = require('../models/user');
      Log     = require('../models/log');
      AuthorizationCode = require('../models/authorizationCode');

const middleware = {
  isLoggedIn : (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
},

logsHandler : (type, description) => {
    let log = {type: type, description: description};
    Log.create(log, function(err, newLog){
        if(err){
            console.log(err)
        } else {
            return newLog;
        }
    })
},

verifyRegisterFields: (req, res, next) => {
    if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber || !req.body.authorizationCode) {
       return res.status(200).json({"status": "error", "message": "Please, fill all the fields!"});
    }
    let code = req.body.authorizationCode;
    AuthorizationCode.findOne({code : code}, function(err, foundCode){
        if(err){
            middleware.logsHandler("error", err)
            return res.status(200).json({"status" : "error", "message" : err});
        } else if(foundCode === null) {
            return res.status(200).json({"status" : "fail", "message" : "Authorization code doesn't exit!"});
        } else {
            next();
        }
    })
},

isUserActive: (req, res, next) => {
    if(!req.body.username || !req.body.password) {
       return res.status(200).json({"status": "error", "message": "Please, fill all the fields!"});
    }
    let username = req.body.username;
    User.findOne({username: username}, function(err, foundUser){
        if(err) {
            return res.status(200).json({"status" : "error", "message" : err});
        } else if(foundUser === null){
            return res.status(200).json({"status" : "fail", "message" : "User does not exit!"});
        } else {
            if(foundUser.isActive){
                next();
            } else {
                return res.status(200).json({"status" : "fail", "message" : "Check verification email and activate account!"});
            }
        }
    })
},

isAdmin : function(req, res, next){
    console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    if(req.user.isAdmin === true){
      next();
    } else {
    return res.status(200).json({"status" : "error", "message" : "Not authorized!"});
    }
  } else {
    return res.status(200).json({"status" : "error", "message" : "Please, login!"});
  }

}

}



module.exports = middleware;
