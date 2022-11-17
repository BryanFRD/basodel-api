const BaseService = require('./BaseService.service');
const UserAccountModel = require('../models/UserAccount.model');
const ArticleModel = require('../models/Article.model');

class UserArticleService extends BaseService {
  
  create = async (model, req, res) => {
    const {userAccountId, articleId} = req.body.model;
    
    if(!userAccountId || !articleId)
      return super.handleResponse(res, {statusCode: 400, content: {error: `error.${model.name}.create.error`}});
    
    const user = await UserAccountModel.findByPk(userAccountId).then(value => value.toJSON());
    const article = await ArticleModel.findByPk(articleId).then(value => value.toJSON());
    
    if(!user || !article)
      return super.handleResponse(res, {statusCode: 400, content: {error: `error.${model.name}.create.notFound`}});
    
    const neededSilver = Math.floor(article.silver * ((100 - article.promo) / 100));
    const neededGold = Math.floor(article.gold * ((100 - article.promo) / 100));
    
    if(neededSilver > user.silver || neededGold > user.gold)
      return super.handleResponse(res, {statusCode: 400, content: {error: `error.${model.name}.create.notEnoughMoney`}});
      
    user.silver -= neededSilver;
    user.gold -= neededGold;
    
    await UserAccountModel.update(user, {where: {id: user.id}});
    
    super.create(model, req, res, true);
  }
  
}

module.exports = UserArticleService;