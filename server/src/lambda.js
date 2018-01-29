'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

/**
 * middleware to easily get the event object Lambda
 * receives from API Gateway
 *
 *     app.get('/', (req, res) => {
 *       res.json(req.apiGateway.event)
 *     })
 *
 */
const middleware = require('aws-serverless-express/middleware');
app.use(middleware.eventContext());

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
