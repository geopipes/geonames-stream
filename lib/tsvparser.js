
var columns = require('../schema').columns,
    through = require('through2');

function factory(){

  var flush = function( chunk, _, next ){
    var row = {}, cells = chunk.toString('utf-8').split('\t');
    cells.forEach( function( cell, i ){
      row[ columns[ i ] ] = ( cell || '' ).trim();
    });
    this.push( row );
    next();
  };

  return through.obj( flush );
}

module.exports = factory;