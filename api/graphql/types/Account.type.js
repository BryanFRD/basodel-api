const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const UserAccountModel = require("../../models/UserAccount.model");

const UserType = new GraphQLObjectType({
  name: 'account',
  fields: () => ({
    id: {type: GraphQLID},
    login: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    user: {
      type: require('./User.type'),
      resolve: ({userAccountId}) => {
        return UserAccountModel.findByPk(userAccountId);
      }
    }
  })
});

module.exports = UserType;