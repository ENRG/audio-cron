var proc    = require('child_process');
var CronJob = require('cron').CronJob;
var moment  = require('moment');

var config = {
  period: '00 * * * * *'
, immediate: true
, arecord: [ '-d', 60 ]
};

var job = new CronJob( config.period, onTick, onComplete );

function onComplete(){
  process.exit(0);
}

function onError( error ){
  console.error( error );
};

function onTick(){
  var arecord = proc.spawn( 'arecord', config.arecord );
  var d = moment().format('YYYYddmm-hhMM');
  arecord.stderr.on( 'error', onError );
}
