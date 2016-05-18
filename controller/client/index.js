'use strict'
const through = require('through2')
const reconnect = require('reconnect-net')
const eos = require('end-of-stream')

module.exports = function (port) {
  const stream = through()
  let connection
  const client = reconnect(c => {
    if (connection) {
      connection.unpipe(stream).unpipe(connection)
    }
    connection = c
    c.pipe(stream).pipe(c)
  }).connect(port || 8124)

  client.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
      console.error(err.port + ' not open, is server running?')
      return
    }
    throw err
  })

  eos(stream, () => client.disconnect())

  stream.client = client

  return stream
}
