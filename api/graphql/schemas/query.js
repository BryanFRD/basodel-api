const { GraphQLObjectType } = require('graphql');
const getAccounts = require('../resolvers/query/getAccounts');
const getUsers = require('../resolvers/query/getUsers');
const getRoles = require('../resolvers/query/getRoles');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAccounts,
    getUsers,
    getRoles
  }
});

module.exports = query;