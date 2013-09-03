var _ = require('underscore');

var EveryConfig = {

  get: function(env) {

    env = env || process.env.NODE_ENV || 'development';

    var _rawconfig = require('./config')
      , config = _.defaults(_rawconfig[ env ],_rawconfig[ '_defaults' ]);

    return config;
  }
};

module.exports = exports = EveryConfig;
