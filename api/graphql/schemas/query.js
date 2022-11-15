const { GraphQLObjectType } = require('graphql');
const getAccounts = require('../resolvers/query/getAccounts');
const getUsers = require('../resolvers/query/getUsers');
const getRoles = require('../resolvers/query/getRoles');
const getCategories = require('../resolvers/query/getCategories');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAccounts,
    getUsers,
    getRoles,
    getCategories
  }
});

module.exports = query;