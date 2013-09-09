// node-xconf: xconf.js
// (c) 2013 by Matthias Lienau <matthias@mlienau.de>
// Freely distributable under the MIT license.

var _ = require('underscore')
  , fs = require('fs');

var XConf = {

  load: function() {

    // Parse args
    var arg
      , args = []
      , _i
      , _len
      , options = {
          useDefaultSection: true
      };

    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      arg = arguments[_i];

      switch (typeof arg) {

        case 'string':
          args.push(arg);
          break;

        case 'object':
          options = _.defaults(options,arg);
          break;
      }
    }

    // Read configuration and filter/aggregate desired sections
    var file
      , ext
      , section
      , fullconfig = null
      , defaults = {};

    // File is either found relatively to dir where calling script resided
    // or - in case of require() - relatively to this modules directory
    file = (args.length >= 1) ? args[ 0 ] : '../../config.json';

    // Default section name is node environment name or 'development' as standard fallback
    section = (args.length >= 2) ? args[ 1 ] : process.env.NODE_ENV || 'development';

    ext = file.substr(file.lastIndexOf('.') + 1);

    if (ext == 'js' || ext == 'json' || ext == '') {
      // "native" formats supported by require()
      fullconfig = require(file);
    } else {

      // other formats need file consumption first
      var fconts = fs.readFileSync(file,'utf8');

      switch (ext.toLowerCase()) {

        case 'json':
          fullconfig = JSON.parse(fconts);
          break;

        case 'yml':
        case 'yaml':
          fullconfig = require('yaml').eval(fconts);
          break;

        case 'ini':
          fullconfig = require('ini').parse(fconts);
          break;

        default:
          break;
      }
    }

    if (fullconfig[ 'default' ] !== undefined && options.useDefaultSection) {
      defaults = fullconfig[ 'default' ];
    }

    return _.defaults(fullconfig[ section ],defaults);
  }
};

module.exports.load = exports.load = XConf.load;
