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
    if(!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber) {
       return res.status(200).json({"status": "error", "message": "Please, fill all the fields!"});
    }
    let user = req.body;
    User.create(user, function(err, newUser){
        if(err){
            middleware.logsHandler("error", err.message)
            res.status(200).json({"status" : "error", "message" : err.message});
        } else {
             middleware.logsHandler("user-add", `New User: ${newUser.username}`)
             res.status(200).json({"status" : "success", "message" : "Succesfully added new user!"});
        }
    })
})


router.put("/:id", function(req, res){
    if(!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber) {
       return res.status(200).json({"status": "error", "message": "Please, fill all the fields!"});
    }
    let id = req.params.id;
    let user = req.body;
    User.findByIdAndUpdate(id, user, function(err, updatedUser){
        if(err){
            middleware.logsHandler("error", err.message)
            res.status(200).json({"status" : "error", "message" : err.message});
        } else {
             middleware.logsHandler("user-update", `Updated User: ${updatedUser.username}`)
             res.status(200).json({"status" : "success", "message" : "Succesfully updated user!"});
        }
    })
})


router.delete("/:id", function(req, res){
    let id = req.params.id;
    console.log(req.user)
    if(req.user._id === id){
        return res.status(200).json({"status" : "error", "message" : "You can't delete your own profile!"});
    }
    User.findByIdAndDelete(id, function(err, deletedUser){
        if(err){
            middleware.logsHandler("error", err.message)
            res.status(200).json({"status" : "error", "message" : err.message});
        } else {
             middleware.logsHandler("user-delete", `Deleted User: ${deletedUser.username}`)
             res.status(200).json({"status" : "success", "message" : "Succesfully deleted user!"});
        }
    })
})



module.exports = router;





