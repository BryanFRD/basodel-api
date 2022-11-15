const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const { ImageModel } = require("../../models");

const ImageType = new GraphQLObjectType({
  name: 'image',
  fields: () => ({
    id: {type: GraphQLID},
    src: {type: GraphQLString},
    alt: {type: GraphQLString}
  })
});

module.exports = ImageType;