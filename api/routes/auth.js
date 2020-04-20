const express           = require('express');
      passport          = require('passport');
      router            = express.Router();
      jwt               = require('jsonwebtoken');
      nodemailer        = require('nodemailer');
      User              = require('../models/user');
      AuthorizationCode = require('../models/authorizationCode');
      config            = require('../config/default');
      middleware        = require('../middleware/default');
      randomatic        = require('randomatic');
      sendEmail         = require('../helper/sendEmail');

router.post('/login', middleware.isUserActive, (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return res.status(200).json({
            "status": "error",
            "message": error
        });
        if (info) return res.status(200).json({
            "status": "info",
            "message": info
        });
        req.login(user, function(error) {
            if (error) return res.status(200).json({
                "status": "error",
                "message": error
            });
            let token = jwt.sign(user.toJSON(), config.secret);
            let userInfo = {_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, isActive: user.isActive, isAdmin: user.isAdmin}
            res.status(200).json({
                "status": "success",
                "user": userInfo,
                "token": token,
                "changePassword": user.passwordChange
            });

        });
    })(req, res);
})


router.post('/register', middleware.verifyRegisterFields, function(req, res) {
    User.find({
        email: req.body.email
    }, function(err, user) {
        console.log(user);
        if (err) {
            console.log(err);
        } else {
            if (user) {
                var newUser = {
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber
                }
                User.register(new User(newUser), req.body.password, function(err, user) {
                    if (err) {
                        console.log(err);
                        return res.status(200).json({
                            "status": "error",
                            "message": err
                        });
                    }
                    let transporter = nodemailer.createTransport(emailConfig);
                    let code = randomatic("Aa0", 10);
                    AuthorizationCode.create({
                        code: code
                    }, function(err, newCode) {
                        if (err) {
                            return res.status(200).json({
                                "status": "error",
                                "message": err
                            });
                        } else {
                            newCode.user = user._id;
                            newCode.save();
                            user.isAdmin = true;
                            user.save();
                            sendEmail(user.email, "New user verification", "verifyEmail.ejs", `${config.baseURL}api/verifyEmail/${code}`);
                            return res.status(200).json({
                                "status": "success",
                                "message": "Please, check your email for verification code"
                            });
                        }
                    })
                });
            } else {
                return res.status(200).json({
                    "status": "error",
                    "message": "User already exists!"
                });
            }
        }
    })
});

router.get('/logout', function(req, res) {
    req.logOut();
    res.status(200).json({
        "status": "success",
        "message": "logged out"
    });
})


router.post('/forgotPassword', function(req, res) {
    let username = req.body.username;
    User.findOne({
        username: username
    }, function(err, foundUser) {
        if (err) {
            console.log(err);
            return res.status(200).json({
                "status": "error",
                "message": err
            })
        } else if (foundUser === null) {
            console.log("Not found!")
            return res.status(200).json({
                "status": "fail",
                "message": "User not found!"
            })
        } else {
            console.log(foundUser)
            let newPassword = randomatic("Aa0", 10);
            foundUser.setPassword(newPassword, function(err, user) {
                if (err) {
                    console.log(err)
                    console.log(user)
                    return res.status(200).json({
                        "status": "error",
                        "message": err
                    })
                } else {
                    console.log(user)
                    user.passwordChange = true;
                    user.save();
                    sendEmail(foundUser.email, "Password reset", "newPassword.ejs", newPassword);
                    return res.status(200).json({
                        "status": "success",
                        "message": "Check your email for new password!"
                    })
                }
            });
        }
    })
})

router.post('/changePassword', function(req, res) {
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    User.findOne({
        username: username
    }, function(err, foundUser) {
        if (err) {
            return res.status(200).json({
                "status": "error",
                "message": err
            });
        } else if (foundUser === null) {
            return res.status(200).json({
                "status": "error",
                "User not found!": err
            });
        } else {
            foundUser.changePassword(oldPassword, newPassword, function(err, user) {
                if (err) {
                    return res.status(200).json({
                        "status": "error",
                        "message": err
                    });
                } else {
                    if (foundUser.passwordChange) {
                        foundUser.passwordChange = false;
                        foundUser.save();
                    }
                    return res.status(200).json({
                        "status": "success",
                        "message": "Password was successfully changed!"
                    });
                }
            })
        }
    });

});


module.exports = router;