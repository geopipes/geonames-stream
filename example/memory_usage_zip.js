
// This should run without causing memory leaks
// You can test this my watching the memory usage with 'top'

var filename = '/var/www/mapzen/pelias-geonames/data/allCountries.zip';

var through = require('through2');
var geonames = require('../index');
var fs = require('fs');

var counts = {};
var countStream = function( key, showIds ){
  return through.obj( function( item, enc, next ){
    if( !counts.hasOwnProperty( key ) ){ counts[key] = 0; }
    ++counts[key];
    console.log( 'counts', counts );
    this.push( item );
    next();
  });
};

fs.createReadStream( filename )
  .pipe( countStream('a') )
  .pipe( geonames.pipeline )
  .pipe( countStream('d') )
  .pipe( through.obj( function( item, enc, next ){ next(); })); // null