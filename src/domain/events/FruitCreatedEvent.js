const eventEmitter = require('./eventEmitter');

class FruitCreatedEvent {
  emit(fruit) {
    eventEmitter.emit('fruitCreated', fruit);
  }

  subscribe(callback) {
    eventEmitter.on('fruitCreated', callback);
  }

  unsubscribe(callback) {
    eventEmitter.off('fruitCreated', callback);
  }
}

module.exports = FruitCreatedEvent;
