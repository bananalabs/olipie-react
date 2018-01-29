module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [async function(context) {
      // Get user if one exists for given email
      const users = await context.app.service('user').find({
        query: {
          email: context.data.email
        }
      });
      const user = users.data[0];
      if (user) {
        const account = await context.app.service('account').get(user.accountId);
        // Return existing account
        context.result = account;
      } else {
        delete context.data.email;
        context.params = {
          new: true
        };
      }
      return context;
    }],
    update: [],
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
