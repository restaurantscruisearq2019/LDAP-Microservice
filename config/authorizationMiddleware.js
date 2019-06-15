const { ldapURL } = require('./apiRoutes');
var ldap = require('express-cached-ldap');

module.exports = ldap({
  ldapUrl: ldapURL,
  baseDN: 'dc=restaurants',
  ldapUsername: 'adUsername',
  ldapPassword: 'adPassword'
})
