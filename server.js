var express      = require('express'),
    passport     = require('passport'),
    passportLocalStrategy = require('passport-local');
    bodyParser   = require('body-parser'),
    nodemailer   = require('nodemailer');
    mongoose     = require('mongoose');
    path         = require('path');
    fs           = require('fs');
    smsRoute     = require('./api/routes/sms');
    loginRoute   = require('./api/routes/login');
    registerRoute = require('./api/routes/register');
    usersRoute = require('./api/routes/users');
    logsRoute = require('./api/routes/logs');
    User         = require('./api/models/user');
    port         = process.env.PORT  || 8080;

const mongoUri = process.env.MONGOURI;

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Connection to DB was successful!")
  }
})


var ldapSettings = {
  server: {
    url: 'ldaps://ad.corporate.com:636',
    bindDN: 'cn=non-person,ou=system,dc=corp,dc=corporate,dc=com',
    bindCredentials: 'secret',
    searchBase: 'dc=corp,dc=corporate,dc=com',
    searchFilter: '(&(objectcategory=person)(objectclass=user)(|(samaccountname={{username}})(mail={{username}})))',
    searchAttributes: ['displayName', 'mail'],
    tlsOptions: {
      ca: [
        // fs.readFileSync('/path/to/root_ca_cert.crt')
      ]
    }
  }
};


var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(`${__dirname}/dist/`)));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(require('express-session')({
//   secret: "This is the most amazing commercial",
//   resave: false,
//   saveUninitialized: false
// }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser(), function(user, done){
    if(user) done(null, user);
});
passport.deserializeUser(User.deserializeUser(), function(id, done){
  done(null, id);
});
passport.use(new passportLocalStrategy(User.authenticate()));




//ROUTES SET-UP

app.use('/api/sms', smsRoute)
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/users', usersRoute)
app.use('/api/logs', logsRoute)

//INITIAL ROUTE

app.all('*', function(req, res){
  res.status(200).sendFile(path.join(`${__dirname}/dist/index.html`))
});


app.listen(port);
