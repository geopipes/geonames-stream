
var through = require('through2'),
    tsvparser = require('./lib/tsvparser'),
    unzip = require('unzip'),
    iostream;

// This pipeline is a bit messy but works fine.
var pipeline = unzip.Parse()
  .on( 'error', console.error.bind( console ) )
  .on( 'entry', function( entry ) {
    if( entry.props.path.match( 'readme' ) ) return; // skip readme files

    // parse the tsv file in to rows of data
    entry.pipe( tsvparser() )

      // run through a series of functions which
      // modify and augments the geonames data.
      .pipe( through.obj( require('./lib/alternative_names') ) )

      // pipe modified data back to the iostream
      .pipe( through.obj( function( data, enc, next ){
        iostream.push( data, enc );
        next();
      }));
  });

// create a stream which proxies input to the pipeline
// and allows abritrary writes back to the output
iostream = through.obj( function( data, enc, next ){
  pipeline.write( data, enc, next );
});

// this has to be manually disabled in node 'v0.10.26'
// for some unknown reason or it fatally throws:
// Error: stream.push() after EOF
iostream.end = function(){}

// convenience function for converting object streams
// back to strings
iostream.stringify = through.obj( function( data, enc, next ){
  this.push( JSON.stringify( data, null, 2 ), 'utf-8' );
  next();
});

module.exports = iostream;