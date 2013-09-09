# node-xconf

## About

A node configuration utility for consuming different formats:

- json
- yaml
- native javascript objects

## Please note!

This project is at an early "draft" development stage now (though roughly working).

## Usage

Every config file consists of _sections_ named as the environments that shall be available. When reading a config file
the section name may be passed as parameter but - when omitted - xconf always defaults to `process.env.NODE_ENV` and tries
to read configuration data from that section. Configuration defaults may be defined within the reserved section "default"
and are overwritten by values of corresponding keys of the desired section.

./config.yaml:
```
default:
  db: 'mongodb://localhost:27017/mydb'
  logging:
    level: 3
development:
  data
    tmpdir: 'data/tmp'
  logging:
    level: 5
production:
  db: 'mongodb://user:password@superawesome.mongodbprovidermetacloud.com:27777/mydb'
  data
    tmpdir: '/media/node/data/tmp'
  foo: 23
  bar
    baz: [42,256,9.81]

```

Calling code:
```
var config = require('xconf').load('./config.yaml'); // let process.env.NODE_ENV == 'development'
console.log('config.logging.level'); // output: 5
// or
var config = require('xconf').load('./config.yaml','production');
console.log('config.logging.level'); // output: 3
console.log('config.bar'); // output: baz: [ 42, 256, 9.81 ] }
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

(or see LICENSE file)
