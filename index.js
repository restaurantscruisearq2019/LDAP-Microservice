const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var passport = require("passport");
var LdapStrategy = require("passport-ldapauth");
const { ldapURL } = require("./config/apiRoutes");

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
    bindDn: "cn=admin, dc=restaurants",
    bindCredentials: "admin",
    searchBase: "dc=restaurants",
    searchFilter: '(uid={{username}})'
  }
};

passport.use(new LdapStrategy(OPTS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("ldapauth", (err, user, info) => {
    res.send(user);
  })(req, res, next);
});

const PORT = process.env.PORT || 5004;
app.listen(PORT);

console.log("App listening at localhost:" + PORT);