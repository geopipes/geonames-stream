
// stream unzip files
var unzip = require('node-unzip-2'),
    bun = require('bun'),
    output = new require('readable-stream/passthrough')();

var parser = unzip.Parse()
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

module.exports = stream;