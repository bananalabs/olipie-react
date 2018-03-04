// Initializes the `user_table` service on path `/user_table`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user.model');
const hooks = require('./user.hooks');
const verifyToken = require('../../middleware/verifyToken');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'user_table',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  // app.use('/user', verifyToken(), createService(options));
  app.use('/user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('user');

  service.hooks(hooks);
};
