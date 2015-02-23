
// stream unzip files
var unzip = require('unzip'),
    bun = require('bun'),
    passthrough = require('readable-stream/passthrough');

module.exports = function() {

  var output = new passthrough();
  var parser = unzip.Parse();

  parser
    .on( 'error', console.error.bind( console ) )
    .on( 'entry', function( entry ) {
      // skip readme files
      if( entry.props.path.match( 'readme' ) ){
        return entry.autodrain();
      }
      return entry.pipe( output );
    });

  var stream = bun([ parser, output ]);
  parser.unpipe( output );

  return stream;
};
