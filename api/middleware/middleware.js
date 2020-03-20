const mongoose = require('mongoose');
      Logs     = require('../models/logs');

const middleware = {
  isLoggedIn : (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
},

logsHandler : (type, description) => {
    let log = {type: type, description: description};
    Logs.create(log, function(err, newLog){
        if(err){
            console.log(err)
        } else {
            return newLog;
        }
    })
}


}



module.exports = middleware;
