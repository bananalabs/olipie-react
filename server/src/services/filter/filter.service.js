// Initializes the `filter` service on path `/filter`
const createService = require('feathers-sequelize');
const createModel = require('../../models/filter.model');
const hooks = require('./filter.hooks');
const verifyToken = require('../../middleware/verifyToken');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'filter',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  // app.use('/filter', verifyToken(), createService(options));
  app.use('/filter', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('filter');

  service.hooks(hooks);
};
