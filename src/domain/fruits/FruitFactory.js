const Fruit = require('./Fruit');

class FruitFactory {
  createFruit(name, description, limit) {
    return new Fruit(name, description, limit);
  }
}

module.exports = FruitFactory;
