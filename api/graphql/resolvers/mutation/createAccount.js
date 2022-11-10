const { GraphQLString, GraphQLNonNull } = require("graphql");
const DB = require("../../../database/db");
const UserAccountModel = require("../../../models/UserAccount.model");
const UserCredentialModel = require("../../../models/UserCredential.model");
const UserCredentialValidator = require("../../../validators/UserCredential.validator");

const createAccount = {
  type: require('../../types/User.type'),
  args: {
    login: {type: GraphQLNonNull(GraphQLString)},
    email: {type: GraphQLNonNull(GraphQLString)},
    password: {type: GraphQLNonNull(GraphQLString)},
    username: {type: GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_, {login, email, password, username}) => {
    const asJson = {login, email, password, user_account: {username}}
    
    const {error} = new UserCredentialValidator().validateCreate(asJson);
    
    if(!error){
      const transaction = await DB.transaction();
      try {
        const userCredential = await UserCredentialModel.create(asJson, {transaction, include: UserAccountModel});
        transaction.commit();
        const userCredJson = userCredential.toJSON();
        
        return userCredJson.user_account;
      } catch (error) {
        transaction.rollback();
        
        return null;
      }
    }
  }
}

module.exports = createAccount;