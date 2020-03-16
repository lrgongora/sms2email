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
      let recipient = user.email
      console.log(data)
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
    from: '"Fred Foo 👻" <lrgongora@outlook.com>', // sender address
    to: recipient, // list of receivers
    subject: "MFA Code", // Subject line
    html: `<b>${authCode}</b>` // html body
  };

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take messages');
   }
});

  transporter.sendMail(options, function(error, info){
      console.log(error)
      console.log(info)
        console.log("Message sent: %s", info.messageId);})

  })
  
  })

module.exports = router;
