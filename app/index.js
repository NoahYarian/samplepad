'use strict';

var express    = require('express'),
    app        = module.exports = express(),
    routes     = require('./routes'),
    sass       = require('node-sass-middleware'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || require('../config/secrets').MONGODB_URL);

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('www'));
app.use(sass({
  src: 'www/styles',
  dest: 'www/styles',
  outputStyle: 'compressed',
  prefix: '/styles'
}));

app.use('/', routes);

app.listen(app.get('port'), function() {
  console.log('Express listening on port ' + app.get('port'));
});
