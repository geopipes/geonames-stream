
// convert alternative_names to an array
function alternate_names( data, enc, next ) {
  if( 'string' == typeof data.alternatenames ) {
    data.alternatenames = data.alternatenames.split(',').filter( valid );
  } else {
    data.alternatenames = [];
  }

  // forward down the pipe
  this.push( data );
  next();
}

function valid( val ){
  return !!val;
}

module.exports = alternate_names;