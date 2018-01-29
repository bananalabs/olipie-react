// Initializes the `video` service on path `/video`
const createService = require('feathers-sequelize');
const createModel = require('../../models/video.model');
const hooks = require('./video.hooks');
const verifyToken = require('../../middleware/verifyToken');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'video',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/video', verifyToken(), createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('video');

  service.hooks(hooks);
};
