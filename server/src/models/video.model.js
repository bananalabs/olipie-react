// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const model = sequelizeClient.define('video', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    flagged: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  model.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    models.video.belongsToMany(models.user, {through: models.uservideo});
  };

  return model;
};
