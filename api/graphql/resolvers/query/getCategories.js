const { GraphQLID, GraphQLList } = require("graphql");
const CategoryModel = require("../../../models/Category.model");

const getCategories = {
  type: new GraphQLList(require('../../types/Category.type')),
  args: {
    id: {type: GraphQLID}
  },
  resolve: (_, {id}) => {
    return id ? [CategoryModel.findByPk(id)] : CategoryModel.findAll();
  }
}

module.exports = getCategories;