const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const UserAccountModel = require("../../models/UserAccount.model");

const RoleType = new GraphQLObjectType({
  name: 'role',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    level: {type: GraphQLInt},
    users: {
      type: GraphQLList(require('./User.type')),
      resolve: ({id}) => {
        return UserAccountModel.findAll({where: {roleId: id}});
      }
    }
  })
});

module.exports = RoleType;