const addRelationship = require('./addRelationship');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  before: {
    all: [],
    find: [
     function(context) {
        console.log('get videos for user');
        const userId = context.params.query['user'];
        console.log('userId = ' + userId);
        if (!userId) {
          console.log('no userId');
          return context;
        }
        return context.app.service('uservideo').find({
          query: {
            userId: userId
          }
        })
        .then((uservideos) => {
          console.log('found uservideos for user');
          console.log(uservideos);
          const videoIds= uservideos.data.map((uservideo) => uservideo.videoId);
          delete context.params.query['user'];
          context.params.query['id'] = {
            [Op.in]: videoIds
          };
          console.log('returning ..');
          console.log(context.params);
          return context;
        })
        .catch((err) => { 
          console.log('could not find uservideos');
          console.log(err);
          return context; 
        })
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
        console.log(`Adding user ${userId} and video ${videoId} to uservideo`);
        return context.app.service('uservideo').create({
            userId: userId,
            videoId: videoId
        }).
        then((result) => {
          console.log('added uservideo');
          console.log(result);
          return context;
        })
        .catch((err) => {
          console.log('failed to add uservideo - ');
          console.log(err);
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
