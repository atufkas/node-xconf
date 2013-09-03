var _ = require('underscore')
  , fs = require('fs');

var EveryConf = {

  options: {},
  _fullconfig: null,
  _parsedConfig: null,

  load: function() {

    var arg
      , args = []
      , _i
      , _len
      , _rawconfig
      , file
      , section;

    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      arg = arguments[_i];

      switch (typeof arg) {

        case 'string':
          args.push(arg);
          break;

        case 'object':
          this.options = _.defaults(this.options,arg);
          break;
      }
    }

    // File is either found relatively to dir where calling script resided
    // or - in case of require() - relatively to this modules directory
    file = (args.length >= 1) ? args[ 0 ] : '../../config.json';

    // Default section name is node environment name or 'development' as standard fallback
    section = (args.length >= 2) ? args[ 1 ] : process.env.NODE_ENV || 'development';

    ext = file.substr(file.lastIndexOf('.') + 1);

    if (ext == 'js' || ext == 'json' || ext == '') {
      // "native" formats supported by require()
      _fullconfig = require(file);
    } else {

      // other formats need file consumption first
      var fconts = fs.readFileSync(file,'utf8');

      switch (ext.toLowerCase()) {

        case 'json':
          _fullconfig = JSON.parse(fconts);
          break;

        case 'yml':
        case 'yaml':
          _fullconfig = require('yaml').eval(fconts);
          break;

        case 'ini':
          _fullconfig = require('ini').parseString(fconts);
          break;

        default:
          break;
      }
    }

    return this._parsedConfig = _.defaults(_fullconfig[ section ],_fullconfig[ 'default' ]);
  }
};

module.exports = exports = EveryConf;
