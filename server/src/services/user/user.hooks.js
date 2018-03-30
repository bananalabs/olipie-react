const addRelationship = require('./addRelationship');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        // Return user if one exists for given email
        return context.app.service('user').find({
          query: {
            email: context.data.email
          }
        })
        .then((users) => {
          const user = users.data[0];
          if (user) {
            context.result = user;
          } else {
            context.params = {
              new: true
            };
          }
          return context;
        }).catch((err) => {
          context.params = {
            new: true
          };
          return context;
        })
      }
    ],
    update: [
      function(context) {
        context.id = context.data.id;
        return context;
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        if (context.params.new) {
          context.result['new'] = true;
        }
        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
