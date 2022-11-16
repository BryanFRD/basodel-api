const BaseService = require('./BaseService.service');

class BlockedUserService extends BaseService {
  
  delete = async (model, req, res) => {
    const {userAccountId, blockedUserId} = req.searchParams;
    
    if(userAccountId && blockedUserId){
      const result = await model.destroy({where: {
        userAccountId, blockedUserId
      }})
        .then(value => ({statusCode: 200}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.delete.error`
        }}));
        
        return super.handleResponse(res, result, true);
    }
    
    return super.handleResponse(res, {statusCode: 405, content: `error.${this.table}.delete.error`}, true);
  }
  
}

module.exports = BlockedUserService;