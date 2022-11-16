const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const ImageType = new GraphQLObjectType({
  name: 'image',
  fields: () => ({
    id: {type: GraphQLID},
    src: {type: GraphQLString},
    alt: {type: GraphQLString}
  })
});

module.exports = ImageType;