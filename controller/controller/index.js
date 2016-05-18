'use strict'

const through = require('through2').obj

function makeController(heading, speed, backled) {
  heading = typeof heading === 'number' ? heading : 0
  speed = typeof speed === 'number' ? speed : 0.3
  backled = typeof backled === 'boolean' ? backled : true

  return through((cmd, enc, cb) => {
	cmd.state = {heading, speed, backled}

    switch ( cmd.name ) {
		case 'toggle-backled':
			cmd.state.backled = ! backled;
			break;
		case 'right':
			cmd.state.heading += 15;
			break;
		case 'left':
			cmd.state.heading -= 15;
			break;
		case '180':
			cmd.state.heading += 180;
			break;
		case 'slower':
			cmd.state.speed -= 0.1;
			break;
		case 'faster':
			cmd.state.speed += 0.1;
			break;
	}

	cb(null, cmd)
  })
}

module.exports = makeController

// tips
// output objects in the form {name, state: {heading, speed, backled}}
