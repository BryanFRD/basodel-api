const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const ChatMessageModel = require("../../models/ChatMessage.model");
const RoleModel = require("../../models/Role.model");

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    gold: {type: GraphQLInt},
    messages: {
      type: new GraphQLList(require('./Message.type')),
      resolve: ({id}) => {
        return ChatMessageModel.findAll({where: {userAccountId: id}});
      }
    },
    role: {
      type: require('./Role.type'),
      resolve: ({roleId}) => {
        console.log('roleId:', roleId);
        return RoleModel.findByPk(roleId);
      }
    }
  })
});

module.exports = UserType;