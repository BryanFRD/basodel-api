const { GraphQLObjectType } = require('graphql');
const createAccount = require('../resolvers/mutation/createAccount');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createAccount
  })
});

module.exports = mutation;