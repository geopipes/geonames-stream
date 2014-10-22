
var columns = require('../schema').columns,
    through = require('through2'),
    byline = require('byline'),
    bun = require('bun');

function factory(){

  var flush = function( chunk, _, next ){
    try {
      var row = {}, cells = chunk.toString('utf-8').split('\t');
      // console.log( 'cells', cells.length );
      cells.forEach( function( cell, i ){
        row[ columns[ i ] ] = ( cell || '' ).trim();
      });
      // console.log( row );
      this.push( row );
    } catch( e ){
      console.error( e );
      process.exit(1);
    }
    if( 'function' === typeof next ){
      next();
    }
  };
  
  var parser = through.obj( { highWaterMark: 1 }, flush, flush );

  // return parser;
  return bun([ byline.createStream(), parser ]);
}

// var parser = through.obj( function( chunk, _, next ){
//     chunk.toString('utf-8').split('\n').forEach( function( line ){
//       var cells = chunk.split(/\s/);
//       var row = {};
//       columns.forEach( function( column, i ){
//         row[ column ] = cells[ i ];
//       });
//       this.push( row );
//     }, this);
//     next();
//   });
// var parser = function()
// {
//   var options = {
//     delimiter: '\t',
//     // comment: '#',
//     quote: false,
//     trim: true,
//     columns: columns,
//     highWaterMark: 16
//   };

//   var stream = parse( options );
//   return stream;
// }

module.exports = factory;