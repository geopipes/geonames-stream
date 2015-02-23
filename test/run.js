
var tape = require('tape');

var common = {};

var tests = [
  require('./interface.js'),
  require('./reusable-streams.js')
];

tests.map(function(t) {
  t.all(tape, common);
});