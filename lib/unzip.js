
// stream unzip files
var through = require('through2'),
    unzip = require('unzip'),
    noop = function(){},
    stream;

var pipeline = unzip.Parse()
  .on( 'error', console.error.bind( console ) )
  .on( 'entry', function( entry ) {
    // skip readme files
    if( entry.props.path.match( 'readme' ) ){
      return entry.autodrain();
    }
    entry.pipe( through.obj( function( data, enc, next ){
      stream.push( data, enc );
      next();
    }));
    entry.end = function(){
      console.log( 'entry end' );
      stream._end();
    };
  });

stream = through.obj( function( data, enc, next ){
  pipeline.write( data, enc );
  next();
});

// allow unzip stream to call end
// once it's finished
stream._end = stream.end;
stream.end = noop;

module.exports = stream;