const { objectType, intArg, stringArg } = require('@nexus/schema');
import FruitCreatedEvent from '../../domain/events/FruitCreatedEvent'

const Fruit = objectType({
  name: 'Fruit',
  definition(t) {
    t.string('name');
    t.string('description');
    t.int('limit');
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('findFruit', {
      type: Fruit,
      args: {
        name: stringArg({ required: true }),
      },
      resolve: (_, { name }, { fruitRepository }) => {
        return fruitRepository.findFruitByName(name);
      },
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('storeFruitToFruitStorage', {
      type: Fruit,
      args: {
        name: stringArg({ required: true }),
        description: stringArg({ required: true }),
        limit: intArg({ required: true }),
      },
      resolve: (_, { name, description, limit }, { fruitFactory, fruitRepository }) => {
        const fruit = fruitFactory.createFruit(name, description, limit);
        const createdFruit = fruitRepository.createFruit(fruit.name, fruit.description, fruit.limit);
        
        const fruitCreatedEvent = new FruitCreatedEvent();
        fruitCreatedEvent.emit(createdFruit);
        return createdFruit;
      },
    });

    t.field('removeFruitFromFruitStorage', {
      type: 'String',
      args: {
        name: stringArg({ required: true }),
        amount: intArg({ required: true }),
      },
      resolve: async (_, { name, amount }, { fruitRepository }) => {
        const fruit = await fruitRepository.findFruitByName(name);
        if (!fruit) {
          throw new Error(`Fruit with name ${name} not found.`);
        }
        return `Removed ${amount} ${name} from fruit storage.`;
      },
    });

    t.field('createFruitForFruitStorage', {
      type: Fruit,
      args: {
        name: stringArg({ required: true }),
        description: stringArg({ required: true }),
        limit: intArg({ required: true }),
      },
      resolve: (_, { name, description, limit }, { fruitFactory, fruitRepository }) => {
        const fruit = fruitFactory.createFruit(name, description, limit);
        return fruitRepository.createFruit(fruit.name, fruit.description, fruit.limit);
      },
    });

    t.field('updateFruitForFruitStorage', {
      type: Fruit,
      args: {
        name: stringArg({ required: true }),
        description: stringArg({ required: true }),
        limit: intArg({ required: true }),
      },
      resolve: async (_, { name, description, limit }, { fruitRepository }) => {
        const fruit = await fruitRepository.updateFruit(name, description, limit);
        if (!fruit) {
          throw new Error(`Fruit with name ${name} not found.`);
        }
        return fruit;
      },
    });

    t.field('deleteFruitFromFruitStorage', {
      type: 'String',
      args: {
        name: stringArg({ required: true }),
        forceDelete: booleanArg({ required: true }),
      },
      resolve: async (_, { name, forceDelete }, { fruitRepository }) => {
        const fruit = await fruitRepository.findFruitByName(name);
        if (!fruit) {
          throw new Error(`Fruit with name ${name} not found.`);
        }
        return `Deleted ${name} from fruit storage.`;
      },
    });
  },
});

module.exports = { Fruit, Query, Mutation };
