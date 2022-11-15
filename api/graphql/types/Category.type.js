const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const ArticleModel = require("../../models/Article.model");

const CategoryType = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    articles: {
      type: GraphQLList(require('./Article.type')),
      resolve: ({id}) => {
        return ArticleModel.findAll({where: {categoryId: id}});
      }
    }
  })
});

module.exports = CategoryType;