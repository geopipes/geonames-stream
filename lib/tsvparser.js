
var columns = require('../schema').columns,
    through = require('through2'),
    byline = require('byline'),
    bun = require('bun');

function factory(){

  var flush = function( chunk, _, next ){
    try {
      var row = {}, cells = chunk.toString('utf-8').split('\t');
      cells.forEach( function( cell, i ){
        row[ columns[ i ] ] = ( cell || '' ).trim();
      });
      this.push( row );
    } catch( e ){
      console.error( 'fatal pipeline error', e );
      process.exit(1);
    }
    if( 'function' === typeof next ){
      next();
    }
  };
  
  var parser = through.obj( { highWaterMark: 1 }, flush );

  // return parser
  return bun([ byline.createStream(), parser ]);
}

module.exports = factory;