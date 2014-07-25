
var geonames = require('../'),
    request = require('request');

request.get( 'http://download.geonames.org/export/dump/NZ.zip' )
  .pipe( geonames.pipeline )
  .pipe( geonames.stringify )
  .pipe( process.stdout );