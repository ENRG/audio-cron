/**
 * ACRON
 */

var config = require('./config');

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
  callback = callback || function(){};

  var defaults = {
    duration: 60
  , bitRate:  64
  , device:   'plughw:1,0'
  , format:   'cd'
  , output:   moment().format( config.filenameFormat )
  };

  for ( var key in defaults ){
    if ( !(key in options) ) options[ key ] = defaults[ key ];
  }

  var output = options.output;
  delete options.output;

  var args = optionsToArgs( options ).concat(
    path.join( config.wavDir, d + '.wav' )
  );

  var arecord = proc.spawn( 'arecord', args );
  arecord.on( 'error', callback );
  arecord.on( 'close', callback );
};