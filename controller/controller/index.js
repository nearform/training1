'use strict'

const through = require('through2').obj

function makeController(heading, speed, backled) {
  heading = typeof heading === 'number' ? heading : 0
  speed = typeof speed === 'number' ? speed : 0.3
  backled = typeof backled === 'boolean' ? backled : true

  return through((cmd, enc, cb) => {

    switch ( cmd.name ) {
		case 'toggle-backled':
			backled = ! backled
			break;
		case 'right':
			heading = (heading += 15) % 360
			break;
		case 'left':
			heading = (heading -= 15) % 360
			break;
		case '180':
			heading = (heading += 180) % 360
			break;
		case 'slower':
			speed -= 0.1
			speed = speed < 0.1 ? 0.1 : speed
			break;
		case 'faster':
			speed += 0.1
			speed = speed > 1.0 ? 1.0 : speed
			break;
	}

	cmd.state = {heading, speed, backled}

	cb(null, cmd)
  })
}

module.exports = makeController

// tips
// output objects in the form {name, state: {heading, speed, backled}}
