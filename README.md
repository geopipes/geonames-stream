## Installation

```bash
$ npm install geonames-stream
```

[![NPM](https://nodei.co/npm/geonames-stream.png?downloads=true&stars=true)](https://nodei.co/npm/geonames-stream)

## Usage

You can extract the geonames on-the-fly while you're still downloading the file:

```javascript
var geonames = require('geonames-stream'),
    request = require('request');

request.get( 'http://download.geonames.org/export/dump/NZ.zip' )
  .pipe( geonames )
  .pipe( geonames.stringify )
  .pipe( process.stdout );
```

Or you can go old-school and work with files on disk:

```javascript
var geonames = require('geonames-stream'),
    fs = require('fs');

// wget http://download.geonames.org/export/dump/NZ.zip
fs.createReadStream( 'NZ.zip' )
  .pipe( geonames )
  .pipe( geonames.stringify )
  .pipe( process.stdout );
```

The easiest way to get started writing your own pipes is to use `through2`; just make sure you call `next()`.

```javascript
var geonames = require('geonames-stream'),
    request = require('request'),
    through = require('through2');

request.get( 'http://download.geonames.org/export/dump/NZ.zip' )
  .pipe( geonames )
  .pipe( through.obj( function( data, enc, next ){
    console.log( data._id, data.name, data.population );
    next();
  }));
```

```bash
2189529 Invercargill 47287
2189530 Invercargill 0
2189531 Inveagh Bay 0
2189532 Inumia Stream 0
```

## Schema

The streams output objects which look like this:

```javascript
{
  "_id": "2179348",
  "name": "Whananaki",
  "asciiname": "Whananaki",
  "alternatenames": [],
  "latitude": "-35.5",
  "longitude": "174.45",
  "feature_class": "P",
  "feature_code": "PPL",
  "country_code": "NZ",
  "cc2": "",
  "admin1_code": "F6",
  "admin2_code": "002",
  "admin3_code": "",
  "admin4_code": "",
  "population": "0",
  "elevation": "",
  "dem": "59",
  "timezone": "Pacific/Auckland",
  "modification_date": "2011-08-01"
}
```

## NPM Module

The `geonames-stream` npm module can be found here:

[https://npmjs.org/package/geonames-stream](https://npmjs.org/package/geonames-stream)

## Contributing

Please fork and pull request against upstream master on a feature branch.

Pretty please; provide unit tests and script fixtures in the `test` directory.