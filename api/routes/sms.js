var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');
    nodemailer   = require('nodemailer');
    path         = require('path');
    fs           = require('fs');
    ldapjs       = require('ldapjs');
    User         = require('../models/user');
    middleware = require('../middleware/middleware');
    emailConfig  = require('../config/email');
    ejs          = require('ejs')

router.get('/callback', function(req, res){
  res.send('GET: Callback route works!');
});

router.post('/callback', function(req, res){
    middleware.logsHandler("error", "Can't find verification code in message!")
  var inboundNumber = req.body.to;
  var authCode = req.body.text || req.body.body;
      authCode = authCode.match(/([0-9])\w{3,}/);
  if(authCode == null){
      middleware.logsHandler("error", "Can't find verification code in message!")
      return res.status(200).json({"message" : "success"})
  } else {
      authCode = authCode[0];
  }
  User.findOne({phoneNumber : inboundNumber}, function(err, foundUser){
    if(err){
        middleware.logsHandler("error", err.message)
        console.log(err)
      return res.status(200).json({"status" : "ok"});
    } else if(foundUser === null) {
        middleware.logsHandler("error", "Phone number not found")
        console.log(err)
      return res.status(200).json({"status" : "ok"});
    } else {
        var recipient = foundUser.email
        let transporter = nodemailer.createTransport(emailConfig);
ejs.renderFile(`${process.cwd()}/api/assets/templates/otc.ejs`, {authCode : authCode}, function(err, data){
        if(err){
            console.log(err);
        } else {
              var options = {
              from: '"Sms2Email" <lrgongora@outlook.com>',
              to: recipient,
              subject: "MFA Code",
              html: data,
             };

  transporter.sendMail(options, function(err, info){
      if(err){
          middleware.logsHandler("error", err.message)
          return res.status(200).json({"status" : "error", "message" : err});
      }
      console.log(info)
      console.log("Message sent: %s", info.messageId);})
      middleware.logsHandler("message-sent", `To: ${inboundNumber} Redirected: ${recipient}` )
      res.status(200).json({"status" : "success", "message" : "success" });
        }
    })
    }
  })

  })

module.exports = router;
