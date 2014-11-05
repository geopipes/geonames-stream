
var through = require('through2'),
    stringify = require('./lib/stringify'),
    parser = require('./lib/tsvparser'),
    unzip = require('./lib/unzip'),
    bun = require('bun'),
    split = require('split');

// bundle the modification streams in to a pipeline
var modifiers = function(){
  return bun([

    // convert alternative names from comma seperated string to an array
    through.obj( require('./lib/alternative_names') )

    // add more data modifiers here..
  ]);
};

// bundle a pipeline for the most common use-case
var pipeline = bun([ unzip(), split(), parser(), modifiers() ]);

// export everything
var geonames = {
  unzip: unzip,
  parser: parser,
  modifiers: modifiers,
  stringify: stringify,
  pipeline: pipeline
};

module.exports = geonames;