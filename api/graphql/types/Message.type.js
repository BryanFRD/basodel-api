const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const MessageType = new GraphQLObjectType({
  name: 'messages',
  fields: () => ({
    id: {type: GraphQLID},
    message: {type: GraphQLString},
    userAccountId: {type: GraphQLID}
  })
});

module.exports = MessageType;