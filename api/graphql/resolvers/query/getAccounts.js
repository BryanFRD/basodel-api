const { GraphQLID, GraphQLList, GraphQLUnionType } = require("graphql");
const UserCredentialModel = require("../../../models/UserCredential.model");

const getAccounts = {
  type: new GraphQLList(require('../../types/Account.type')),
  args: {
    id: {type: GraphQLID}
  },
  resolve: (_, {id}) => {
    return id ? [UserCredentialModel.findByPk(id)] : UserCredentialModel.findAll();
  }
}

module.exports = getAccounts;