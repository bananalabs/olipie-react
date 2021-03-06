const Sequelize = require('sequelize');
const config = require('config');
// ----------------------------------------------------------------------- //
// NOTE: tufan.io modification                                             //
// This is the only "enhancement" made by tufan.io to support ease of use. //
// It enables using `config/defaults.json` to use sqlite and mysql.        //
// This is done to ease getting started with fewer dependencies. Feel free //
// hack around this to suit your specific need.                            //
// ----------------------------------------------------------------------- //
function getSequelize(app) {
  /* const activeDb = ['sqlite', 'mysql'].reduce((_, db) => {
    console.log(db);
    console.log(app.get(db));
    return _ || (app.get(db) ? db : null);
  }, (app.get('active-db') || null));
  console.log('activeDb');
  console.log(activeDb); */
  const activeDb = 'mysql';
  switch (activeDb) {
    case 'mysql':
      {
        console.log('case mysql');
        console.log(config);
        return new Sequelize(
          config.dbname,
          config.username,
          process.env.DB_PASSWORD,
          {
            dialect: 'mysql',
            host: config.host,
            port: config.port,
            logging: false,
            operatorsAliases: false,
            define: {
              freezeTableName: true
            }
          });
      }
    case 'sqlite':
      {
        console.log('case sqlite');
        const connectionString = app.get('sqlite');
        return new Sequelize(
          connectionString, {
            dialect: 'sqlite',
            logging: false,
            operatorsAliases: false,
            define: {
              freezeTableName: true
            }
          });
      }
    default:
      const msg = [
        `Only sqlite and mysql are supported at this point.`,
        `You *could* hand-code the fix in '${__filename}', just saying...`
      ].join('\n');
      new Error(msg);
  }
}

module.exports = function (app) {
  const sequelize = getSequelize(app);
  // const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  /* const models = sequelize.models;
  Object.keys(models).forEach(name => {
    console.log(name);
    if ('associate' in models[name]) {
      console.log('in associate');
      models[name].associate(models);
    }
  }); */
}

  /*app.setup = function (...args) {
    console.log('in app.setup');
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    // sequelize.sync();

    return result;
  }; */
// };
