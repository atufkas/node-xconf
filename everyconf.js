var _ = require('underscore');


var EveryConfig = {
  
  options: {
    env: process.env.NODE_ENV || 'development',
    format: 'js'
  },
  
  _cachedConfig: null,
  
  auto: function(name) {
    
    name = name || 'config';
    env = process.env.NODE_ENV || 'development';
    file = '../../' + name + '.js';
    
    var _rawconfig = require(file)
    return this._cachedConfig = _.defaults(_rawconfig[ env ],_rawconfig[ '_defaults' ]);
  }
};

module.exports = exports = EveryConfig;
