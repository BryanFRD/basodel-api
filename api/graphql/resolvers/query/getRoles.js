const { GraphQLList, GraphQLID } = require("graphql");
const RoleModel = require("../../../models/Role.model");

const getRoles = {
  type: new GraphQLList(require('../../types/Role.type')),
  args: {
    id: {type: GraphQLID}
  },
  resolve: (_, {id}) => {
    return id ? [RoleModel.findByPk(id)] : RoleModel.findAll();
  }
}

module.exports = getRoles;