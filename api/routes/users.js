var express = require('express');
    router   = express.Router();
    User     = require('../models/user');


router.get("/", function(req, res){
    User.find({}, function(err, users){
        if(err || !users){
            res.status(200).json({"status" : "error", "message" : "something went wrong"});
        } else {
            res.send(users);
        }
    })
})




module.exports = router;





