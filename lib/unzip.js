
// stream unzip files
var through = require('through2'),
    unzip = require('unzip'),
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
  });

stream = through.obj( function( data, enc, next ){
  pipeline.write( data, enc );
  next();
});

/**
  @fixme: this has to be manually disabled in node 'v0.10.26'
  for some unknown reason or it fatally throws:
  
  Error: stream.push() after EOF
**/
stream._end = stream.end;
stream.end = function(){
  if( !arguments.length ) return;
  stream._end.apply( stream, arguments );
}

module.exports = stream;