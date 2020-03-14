const express      = require('express');
      passport     = require('passport');
      router       = express.Router();


const auth = () => {
  return (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    console.log("Error: " + error);
    console.log(user);
    console.log("Info: " + info);
    if (error) return res.status(400).json({"statusCode": 200, "message": error});
    if (info) return res.status(400).json({"statusCode": 200, "message": info});
    req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
  })(req, res, next);
}
}

router.post('/', auth(), (req, res) => {
  console.log(req)
  res.status(200).json({"statusCode" : 200, "message" : "success", "user" : req.user});
})


module.exports = router;
