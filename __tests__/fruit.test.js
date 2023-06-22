const Fruit = require('../src/domain/fruits/Fruit');
const FruitFactory = require('../src/domain/fruits/FruitFactory');

describe('FruitFactory', () => {
  let fruitFactory;

  beforeEach(() => {
    fruitFactory = new FruitFactory();
  });

  test('should create a valid fruit', () => {
    const fruit = fruitFactory.createFruit('Apple', 'Red and juicy', 10);

    expect(fruit).toBeInstanceOf(Fruit);
    expect(fruit.name).toBe('Apple');
    expect(fruit.description).toBe('Red and juicy');
    expect(fruit.limit).toBe(10);
  });

});
