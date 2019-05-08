var sinon = require('sinon')

function getSocketStub() {
  return {
    connect: sinon.spy(),
    disconnect: sinon.spy(),
    subscribe: sinon.spy(),
    on: sinon.spy(),
    unref: sinon.spy(),
    ref: sinon.spy(),
    close: sinon.spy(),
    send: sinon.spy(),
    bindSync: sinon.spy(),
    setsockopt: sinon.spy(),
  }
}
module.exports = {
  getSocketStub: getSocketStub
}
