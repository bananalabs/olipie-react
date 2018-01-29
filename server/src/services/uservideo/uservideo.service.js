// Initializes the `video` service on path `/video`
const createService = require('feathers-sequelize');
const createModel = require('../../models/uservideo.model');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'uservideo',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/uservideo', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uservideo');

};
