const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {}

module.exports = new MyEventEmitter();
