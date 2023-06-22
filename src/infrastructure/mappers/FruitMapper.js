const Fruit = require('../../domain/fruits/Fruit');
const FruitModel = require('../database/models/FruitModel');

class FruitMapper {
  toDomainModel(fruitModel) {
    return new Fruit(fruitModel.name, fruitModel.description, fruitModel.limit);
  }

  toDatabaseModel(fruit) {
    return new FruitModel({
      name: fruit.name,
      description: fruit.description,
      limit: fruit.limit,
    });
  }
}

module.exports = FruitMapper;
