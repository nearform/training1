'use strict'

const through = require('through2').obj

module.exports = () => through(function(keypress, enc, cb) {

    if (keypress.key) {
        if (keypress.key.name === 'c' && keypress.key.ctrl){
            this.push({name:'die'});
            cb();
            return;
        }
        switch (keypress.key.name){
            case 'c':
                this.push({name:'reset'});
                break;
            case 'b':
                this.push({name:'toggle-backled'});
                break;
            case 'right':
                this.push({name:'right'});
                break;
            case 'left':
                this.push({name:'left'});
                break;
            case 'up':
                this.push({name:'roll'});
                break;
            case 'down':
                this.push({name:'stop'});
                break;
        }
    }
    if (keypress.ch === ','){
       this.push({name:'slower'});
    }
    if (keypress.ch === '.'){
       this.push({name:'faster'});
    }
    cb();
});

// tips:
// output objects with form {name}
