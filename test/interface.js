
var geonames = require('../');

module.exports.interface = {};

module.exports.interface.unzip = function(test, common) {
  test('unzip', function(t) {
    t.equal(typeof geonames.unzip, 'function', 'valid function');

    var u = geonames.unzip();
    t.equal(typeof u._read, 'function', 'valid readable');
    t.equal(typeof u._write, 'function', 'valid writeable');
    t.end();
  });
}

module.exports.interface.parser = function(test, common) {
  test('parser', function(t) {
    t.equal(typeof geonames.parser, 'function', 'valid function');

    var p = geonames.parser();
    t.equal(typeof p, 'object', 'valid stream');
    t.equal(typeof p._read, 'function', 'valid readable');
    t.equal(typeof p._write, 'function', 'valid writeable');
    t.end();
  });
}

module.exports.interface.modifiers = function(test, common) {
  test('modifiers', function(t) {
    t.equal(typeof geonames.modifiers, 'function', 'valid function');

    var m = geonames.parser();
    t.equal(typeof m, 'object', 'valid stream');
    t.equal(typeof m._read, 'function', 'valid readable');
    t.equal(typeof m._write, 'function', 'valid writeable');
    t.end();
  });
}

module.exports.interface.stringify = function(test, common) {
  test('stringify', function(t) {
    t.equal(typeof geonames.stringify, 'object', 'valid function');
    t.equal(typeof geonames.stringify._read, 'function', 'readable stream');
    t.equal(typeof geonames.stringify._write, 'function', 'writable stream');
    t.end();
  });
}

module.exports.interface.pipeline = function(test, common) {
  test('pipeline', function(t) {
    t.equal(typeof geonames.pipeline, 'object', 'valid function');
    t.equal(typeof geonames.pipeline._read, 'function', 'valid readable');
    t.equal(typeof geonames.pipeline._write, 'function', 'valid writeable');
    t.end();
  });
}

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('external interface: ' + name, testFunction)
  }

  for( var testCase in module.exports.interface ){
    module.exports.interface[testCase](test, common);
  }
}