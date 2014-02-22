/**
 * ACRON
 */

var fs      = require('fs');
var path    = require('path');
var proc    = require('child_process');
var moment  = require('moment');
var config  = require('./config');

var getOptionArgEquivalent = function( option ){
  switch ( option ){
    default:            return null;
    case 'duration':    return '-d';
    case 'bitRate':     return '-r';
    case 'device':      return '-D';
    case 'format':      return '-f';
  }
};

var optionsToArgs = function( options ){
  var args = [];
  Object.keys( options ).forEach( function( k ){
    args.push( getOptionArgEquivalent( k ), options[ k ] );
  });
  return args;
};

module.exports.record = function( options, callback ){
  if ( typeof options === 'function' ){
    callback = options
    options = {};
  }

  callback = callback || function(){};

  var defaults = {
    duration: 60
  , bitRate:  64
  , device:   'plughw:1,0'
  , format:   'cd'
  , output:   moment().format( config.filenameFormat ) + '.wav'
  };

  for ( var key in defaults ){
    if ( !(key in options) ) options[ key ] = defaults[ key ];
  }

  var output = options.output;
  delete options.output;

  var args = optionsToArgs( options ).concat(
    path.join( config.wavDir, output )
  );

  console.log( 'arecord', args.join(' ') );

  var arecord = proc.spawn( 'arecord', args );

  // arecord.on( 'error', function( code, error ){
  //   callback( error );
  // });

  // arecord.on( 'close', function( code ){
  //   callback();
  // });
};
