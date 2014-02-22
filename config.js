module.exports = {
  period:         '00 * * * * *'
, immediate:      true
, arecord:        [ '-f', 'cd', '-D', 'plughw:1,0', '-d', 60, '-r', 64 ]
, lame:           [ '-x', '-r', '-' ]
, wavDir:         '../ftp/wav'
, mp3Dir:         '../ftp/mp3'
, filenameFormat: 'YYYYMMDD-hhmm'
};