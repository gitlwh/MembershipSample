const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-662976.oktapreview.com',
  token: '00IlBANkb4ZAJ27LXyoow4olkE5ql10qFUAvvZVKpt'
});

module.exports = client;