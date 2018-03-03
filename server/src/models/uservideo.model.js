// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const model = sequelizeClient.define('uservideo', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    videoId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
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
  };

  return model;
};
