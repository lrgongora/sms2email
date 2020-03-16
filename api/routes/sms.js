var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');
    nodemailer   = require('nodemailer');
    path         = require('path');
    fs           = require('fs');
    ldapjs       = require('ldapjs');
    User         = require('../models/user');


router.get('/callback', function(req, res){
  res.send('GET: Callback route works!');
});

router.post('/callback', function(req, res){
  var inboundNumber = req.body.to;
  var authCode = req.body.text;
  User.find({phoneNumber : inboundNumber}, function(err, user){
      let recipient = user[0].email
    if(err){
      return res.status(400).json({"status" : "error", "message" : err});
    }

        let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587,     // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: 'lrgongora@outlook.com',
            pass: 'Apoc@lipsis233'
        }

    });

  // send mail with defined transport object
  let options = {
    from: '"Sms2Email" <lrgongora@outlook.com>', // sender address
    to: recipient, // list of receivers
    subject: "MFA Code", // Subject line
    html: {path: "../assets/templates/otc.html"},
    context: {
        authCode : authCode
    }
  };

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take messages');
   }
});

  transporter.sendMail(options, function(error, info){
      if(error){
          console.log(error)
          return res.status(200).json({"status" : "error", "message" : error});
      }
      console.log(info)
      console.log("Message sent: %s", info.messageId);})
      res.status(200).json({"status" : "success", "message" : "success" });

  })
  
  })

module.exports = router;
