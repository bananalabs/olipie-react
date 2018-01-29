
const account = require('./account/account.service.js');
const user = require('./user/user.service.js');
const video = require('./video/video.service.js');
const filter = require('./filter/filter.service.js');
const uservideo = require('./uservideo/uservideo.service.js');
module.exports = function (app) {
  app.configure(account);
  app.configure(user);
  app.configure(video);
  app.configure(filter);
  app.configure(uservideo);
};
