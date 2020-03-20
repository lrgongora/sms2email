var express    = require('express');
    router     = express.Router();
    User       = require('../models/user');
    middleware = require('../middleware/middleware');



router.get("/", function(req, res){
    User.find({}, function(err, users){
        if(err || !users){
            middleware.logsHandler("error", err.message)
            res.status(200).json({"status" : "error", "message" : err.message});
        } else {
            let usersList = [];
            users.forEach(function(user){
                usersList.push({id: user._id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber})
            })
            res.send(usersList);
        }
    })
})

router.post("/", function(req, res){
    let use = req.body.user;
    User.create(user, function(err, newUser){
        if(err){
            middleware.logsHandler("error", err.message)
            res.status(200).json({"status" : "error", "message" : err.message});
        } else {
             middleware.logsHandler("user-add", `New user: ${newUser.username}`)
             res.status(200).json({"status" : "success", "message" : "Succesfully added new user!"});
        }
    })
})




module.exports = router;





