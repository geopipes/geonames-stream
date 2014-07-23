
var geonames = require('../');
    fs = require('fs');

// wget http://download.geonames.org/export/dump/NZ.zip

fs.createReadStream( 'NZ.zip' )
  .pipe( geonames )
  .pipe( geonames.stringify )
  .pipe( process.stdout );