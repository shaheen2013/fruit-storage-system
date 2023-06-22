const { makeSchema } = require('@nexus/schema');
const { nexusSchemaPrisma } = require('nexus-plugin-prisma/schema');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const { permissions } = require('./permissions');

const schema = makeSchema({
  types: [Fruit, Query, Mutation],
  plugins: [nexusSchemaPrisma()],
  outputs: {
    typegen: __dirname + '/generated/nexus.ts',
    schema: __dirname + '/generated/schema.graphql',
  },
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: (request) => {
    return {
      fruitFactory: new FruitFactory(),
      fruitRepository: new FruitRepository(),
    };
  },
});

module.exports = server;
