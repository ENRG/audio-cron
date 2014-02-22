var fs      = require('fs');
var path    = require('path');
var proc    = require('child_process');
var CronJob = require('cron').CronJob;
var moment  = require('moment');
var config  = require('./config');
var acron   = require('./');

// Periodically record 1 second wav files
var job = new CronJob({
  cronTime: config.period
, onTick:   onTick
, start:    config.immediate
});

// As wav files come into the directory, convert them to
// mp3 and then delete the old wav file
fs.watch( config.wavDir, onWavDirChange );

function onComplete(){
console.log("complete!");
  process.exit(0);
}

function onError( error ){
  console.error( error );
};

function onSuccess( filename ){
  console.log( "Processed", filenamed );
}

function onTick(){
  console.log('tick');

  acron.record( function( error ){
    if ( error ) return onError( error );
    console.log('Recording complete!');
  });
}

function onWavDirChange( e, filename ){
  return;
  return console.log('onWavDirChange', filename);

  var lame = proc.spawn(
    'lame'
  , config.lame.concat( path.join( config.mp3Dir, filename ) )
  );

  fs.createReadStream( filename ).pipe(
    lame.stdin
  ).on( 'close', onLameEncodingComplete.bind( null, filename ) );
}

function onLameEncodingComplete( filename ){
  fs.unlink( path.join( config.mp3Dir, filename ), function( error ){
    if ( error ) return onError( error );
    onSuccess( filename );
  });
}

module.exports.onTick = onTick;
module.exports.onWavDirChange = onWavDirChange;
