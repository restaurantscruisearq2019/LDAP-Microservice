const express = require("express");
const bodyParser   = require('body-parser');
const app = express();
const cors = require("cors");
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
var session = require('express-session');
const { ldapURL } = require('./config/apiRoutes');

require("./routes/index")(app);

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var OPTS = {
  server: {
    url: ldapURL,
    bindDn: 'cn=admin',
    bindCredentials: 'admin',
    searchBase: 'dc=restaurants',
    searchFilter: '(sAMAccountName={{username}})'
  }
};

passport.use(new LdapStrategy(OPTS));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'ldap secret',
  resave: false,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 } /// maxAge in milliseconds
}));

app.post('/login', passport.authenticate('ldapauth', {
  successRedirect: '/', failureRedirect: '/login'
}),
  function(req, res) {
    console.log(res);
    res.send({status: 'ok'});
  }
); 

const PORT = process.env.PORT || 5004;
app.listen(PORT);

console.log("App listening at localhost:" + PORT);
