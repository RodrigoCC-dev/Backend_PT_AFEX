let repl = require('repl');
let models = require('./db/models/index');

Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName];
});

global['Op'] = require('sequelize').Op

let replServer = repl.start({
  prompt: 'app > '
});

replServer.context.db = models;
