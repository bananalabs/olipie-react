const verifier = require('google-id-token-verifier');

module.exports = function (app) { // eslint-disable-line no-unused-vars
  return function(req, res, next) {
    const token = req.headers['x-auth'];
    const clientId = '690222534289-ptpq63a1qah7fhde94uc36lmjrbtku41.apps.googleusercontent.com';
    verifier.verify(token, clientId, function (err, tokenInfo) {
      if (err) {
        res.status(500).send({ error: 'Invalid auth token' })
      } else {
        next();
      }
    });
  }
};
