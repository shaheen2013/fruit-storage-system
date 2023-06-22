const FruitModel = require('../models/FruitModel');
const Fruit = require('../../domain/fruits/Fruit');

class FruitRepository {
  async createFruit(name, description, limit) {
    const fruit = new FruitModel({ name, description, limit });
    await fruit.save();
    return fruit;
  }

  async updateFruit(name, description, limit) {
    const fruit = await FruitModel.findOneAndUpdate({ name }, { description, limit }, { new: true });
    return fruit;
  }

  async removeFruit(name) {
    await FruitModel.deleteOne({ name });
  }

  async findFruitByName(name) {
    const fruit = await FruitModel.findOne({ name });
    if (fruit) {
      return new Fruit(fruit.name, fruit.description, fruit.limit);
    }
    return null;
  }
}

module.exports = FruitRepository;
