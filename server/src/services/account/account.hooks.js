module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [function(context) {
      // Get user if one exists for given email
      return context.app.service('user').find({
        query: {
          email: context.data.email
        }
      })
      .then((users) => {
        console.log('users');
        console.log(users);
        const user = users.data[0];
        if (user) {
          console.log('found user');
          return context.app.service('account').get(user.accountId)
          .then((account) => {
            // Return existing account
            console.log('account');
            console.log(account);
            context.result = account;
          })
          .catch((err) => {
            console.log(err);
            return context;
          })
        } else {
          console.log('no user');
          delete context.data.email;
          context.params = {
            new: true
          };
        }
        return context;
      })
      .catch((err) => {
        delete context.data.email;
        context.params = {
          new: true
        };
        return context;
      })
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
        console.log('account create after');
        console.log(context);
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
