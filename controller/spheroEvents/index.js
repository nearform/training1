'use strict';

const through = require('through2').obj();

function spheroEvents(ball){
    ball.on('dataStreaming', function(data, enc, cb){
        through.write({
            name: 'loc',
            x: data.xOdometer.value[0],
            y: data.yOdometer.value[0]
        });
    });
    return through;
}

module.exports = spheroEvents;
