const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require("graphql");
const { ImageModel } = require("../../models");

const ArticleType = new GraphQLObjectType({
  name: 'article',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    silver: {type: GraphQLInt},
    gold: {type: GraphQLInt},
    promo: {type: GraphQLInt},
    image: {
      type: require('./Image.type'),
      resolve: ({imageId}) => {
        return ImageModel.findByPk(imageId);
      }
    }
  })
});

module.exports = ArticleType;