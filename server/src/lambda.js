const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const rest = require( '@feathersjs/express/rest');
const rp = require('request-promise');

const handler = require('@feathersjs/errors/handler');
const notFound = require('@feathersjs/errors/not-found');

const services = require('./services');
const appHooks = require('./app.hooks');

const sequelize = require('./sequelize');

let app = null;

let serverReady = false;

function init() {
  app = express(feathers());

  // Load app configuration
  app.configure(configuration());
  // Enable CORS, security, compression, favicon and body parsing
  app.use(cors());
  app.use(helmet());
  app.use(compress());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Set up Plugins and providers
  app.configure(rest());


  app.configure(sequelize);
  // Set up our services (see `services/index.js`)
  app.configure(services);
  // Configure a middleware for 404s and the error handler
  app.use(notFound());
  app.use(handler());

  app.hooks(appHooks);
}

function sendReq(reqOpts, context) {
  rp(reqOpts)
  .then(function _then(body) {
    console.log(body);
    context.succeed({body: body});
  })
  .catch(function _catch(err) {
    console.log(err);
    context.fail(err);
  });
};

exports.handler = function _f(event, context) {
  const reqopts = {
    method: event.method,
    uri: 'http://127.0.0.1:3000' + event.resource,
    headers: {
      'x-auth': event.headers['x-auth']
    },
    body: event.body,
    json: true
  };
  reqopts.uri = reqopts.uri.replace('{id}', event.id);
  console.log(event);
  console.log(reqopts);
  console.log('serverReady = ' + serverReady);
  if (!serverReady) {
    try {
      init();
      app.get('sequelizeClient').sync()
      .then(function _then() {
        app.listen(3000, function() {
          console.log(`Feathers server listening on port 3000`);
          serverReady = true;
          if (event.resource) {
            sendReq(reqopts, context);
          }
        });
      })
      .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  } else {
    if (event.resource) {
      sendReq(reqopts, context);
    } else {
      context.succeed('Done with init');
    }
  }
};
