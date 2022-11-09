const { GraphQLList, GraphQLID } = require("graphql");
const UserAccountModel = require("../../../models/UserAccount.model");

const getUsers = {
  type: new GraphQLList(require('../../types/User.type')),
  args: {
    id: {type: GraphQLID}
  },
  resolve: (_, {id}) => {
    return id ? [UserAccountModel.findByPk(id)] : UserAccountModel.findAll();
  }
}

module.exports = getUsers;