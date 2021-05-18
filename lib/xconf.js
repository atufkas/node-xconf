// node-xconf: xconf.js
// (c) 2013 by Matthias Lienau <matthias@mlienau.de>
// Freely distributable under the MIT license.

const _ = require('underscore')
  , fs = require('fs');

const XConf = {

  load: function () {

    // Parse args
    let arg
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
          options = _.defaults(options, arg);
          break;
      }
    }

    // Read configuration and filter/aggregate desired sections
    let file
      , ext
      , section
      , fullConfig = null
      , defaults = {};

    // File is either found relatively to dir where calling script resided
    // or - in case of require() - relatively to this modules directory
    file = (args.length >= 1) ? args[0] : '../../config.json';

    // Default section name is node environment name or 'development' as standard fallback
    section = (args.length >= 2) ? args[1] : process.env.NODE_ENV || 'development';

    ext = file.substr(file.lastIndexOf('.') + 1);

    if (ext === 'js' || ext === 'json' || ext === '') {
      // "native" formats supported by require()
      fullConfig = require(file);
    } else {

      // other formats need file consumption first
      const fileContents = fs.readFileSync(file, 'utf8');

      switch (ext.toLowerCase()) {

        case 'json':
          fullConfig = JSON.parse(fileContents);
          break;

        case 'yml':
        case 'yaml':
          fullConfig = require('yaml').eval(fileContents);
          break;

        default:
          break;
      }
    }

    if (fullConfig['default'] !== undefined && options.useDefaultSection) {
      defaults = fullConfig['default'];
    }

    return _.defaults(fullConfig[section], defaults);
  }
};

module.exports.load = exports.load = XConf.load;
