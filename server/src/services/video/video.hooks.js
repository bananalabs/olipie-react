const addRelationship = require('./addRelationship');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  before: {
    all: [],
    find: [
     function(context) {
        const userId = context.params.query['user'];
        if (!userId) {
          return context;
        }
        context.app.service('uservideo').find({
          query: {
            userId: userId
          }
        })
        .then((uservideos) => {
          const videoIds= uservideos.data.map((uservideo) => uservideo.videoId);
          delete context.params.query['user'];
          context.params.query['id'] = {
            [Op.in]: videoIds
          };
          return context;
        })
        .catch((err) => { return context; })
      } 
    ],
    create: [],
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
        // Add userId+videoId to uservideo
        const userId = context.data.userId;
        const videoId = context.result.id;
        context.app.service('uservideo').create({
            userId: userId,
            videoId: videoId
        }).
        then((result) => {
          return context;
        })
        .catch((err) => {
          return context;
        })
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
