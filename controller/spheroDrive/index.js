'use strict'

const through = require('through2').obj

function spheroDrive(sphero) {

  return through((cmd, enc, cb) => {
    switch (cmd.name) {
      case 'reset':
        sphero.randomColor(function() {
          const defaultOpts = {flags: 0x01, x: 0, y: 0, yawTare: 0}
          sphero.configureLocator(defaultOpts)
        })
        break
      case 'toggle-backled':
        if (cmd.state.backled) {
          sphero.setBackLed(255)
        } else {
          sphero.setBackLed(0)
        }
        break
      case 'right':
      case 'left':
        sphero.roll(0, cmd.state.heading)
        break
      case 'roll':
        sphero.roll(cmd.state.speed * 255, cmd.state.heading)
        break
      case 'stop':
        sphero.roll(0)
        break
      case 'die':
        sphero.halt()
        break
    }

    cb(null, cmd)
  })

}

module.exports = spheroDrive