
var parse = require('csv-parse'),
    columns = require('../schema').columns;

var parser = function()
{
  var options = {
    delimiter: '\t',
    // comment: '#',
    quote: false,
    trim: true,
    columns: columns,
    highWaterMark: 16
  };

  var stream = parse( options );
  return stream;
}

module.exports = parser;