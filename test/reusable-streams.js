
// Test cases in reference to:
// https://github.com/geopipes/geonames-stream/issues/9

var geonames = require('../');

module.exports.reusable = {};

// @todo: please make the test below pass:

// module.exports.reusable.unzip = function(test, common) {
//   test('unzip', function(t) {

//     var s1 = geonames.unzip();
//     s1.end();

//     var s2 = geonames.unzip();
//     s2.end();

//     t.end();
//   });
// };

module.exports.reusable.parser = function(test, common) {
  test('parser', function(t) {

    var s1 = geonames.parser();
    s1.end();

    var s2 = geonames.parser();
    s2.end();

    t.end();
  });
};

module.exports.reusable.modifiers = function(test, common) {
  test('modifiers', function(t) {

    var s1 = geonames.modifiers();
    s1.end();

    var s2 = geonames.modifiers();
    s2.end();

    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('reusable streams: ' + name, testFunction);
  }

  for( var testCase in module.exports.reusable ){
    module.exports.reusable[testCase](test, common);
  }
};