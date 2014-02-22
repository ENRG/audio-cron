var fs      = require('fs');
var path    = require('path');
var proc    = require('child_process');
var CronJob = require('cron').CronJob;
var moment  = require('moment');

var config = {
  period:     '00 * * * * *'
, immediate:  true
, arecord:    [ '-d', 60, '-r', 64 ]
, lame:       [ '-x', '-r', '-' ]
, wavDir:     '../ftp/wav'
, mp3Dir:     '../ftp/mp3'
};

// Periodically record 1 second wav files
var job = new CronJob( config.period, onTick, onComplete );
job.start();

// As wav files come into the directory, convert them to
// mp3 and then delete the old wav file
fs.watch( config.wavDir, onWavDirChange );

function onComplete(){
  process.exit(0);
}

function onError( error ){
  console.error( error );
};

function onSuccess( filename ){
  console.log( "Processed", filenamed );
}

function onTick(){
  var d = moment().format('YYYYddmm-hhMM');

  var arecord = proc.spawn(
    'arecord'
  , config.arecord.concat( path.join( config.wavDir, d + '.wav' ) )
  );

  arecord.stderr.on( 'error', onError );
}

function onWavDirChange( e, filename ){
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