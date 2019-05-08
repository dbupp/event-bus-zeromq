var _ = require('lodash')
var zmq = require('zeromq')
var Logger = require('../logger')
var log = Logger.getLogger('micro.bus.publisher')
var evtFactory = require('./event')

var defaults = {
  address: 'tcp://127.0.0.1:5558',
  producerId: null
}

function send(address, producer, topic, data) {
  var evt = evtFactory.getInstance(producer, topic, data)

  var logData = _.pick(evt, ['producer', 'timestamp', 'topic', 'uuid'])
  logData.data = data
  //in the logs the non serialized data should be present
  log.debug(logData, 'Published event to topic %s', topic)

  var socket = zmq.socket('dealer')
  socket.connect(address)
  socket.send(evt.toFrames())
  socket.disconnect(address)
}

function getInstance(configuration) {
  var config = _.defaults({}, configuration, defaults)

  if (!config.producerId){ throw new Error('Invalid producer id') }

  log.info("Producer '%s' opened a publisher stream to %s",
    config.producerId, config.address)

  return { send: _.partial(send, config.address, config.producerId) }
}

module.exports = { getInstance: getInstance }
