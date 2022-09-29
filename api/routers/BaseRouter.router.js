const express = require('express');
const Router = express.Router;
const controllers = require('../controllers');
const authenticateToken = require('../middlewares/AuthenticateToken.middleware');

class BaseRouter {
  
  constructor(needsAuthenticate = {}){
    this.router = Router();
    this.name = this.constructor.name;
    this.table = this.name.replace('Router', '');
    this.controller = new controllers[`${this.table}Controller`]();
    
    this.needsAuthenticate = {
      create: true,
      read: true,
      update: true,
      delete: true,
      ...needsAuthenticate
    }
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    const nextFunc = (req, res, next) => {next();}
    
    // CREATE
    this.router.post('/',
      this.needsAuthenticate.create ? authenticateToken : nextFunc,
      async (req, res) => {
        return await this.controller.create(req, res);
    });
    
    // READ
    this.router.get('/',
      this.needsAuthenticate.read ? authenticateToken : nextFunc,
      async (req, res) => {
        return await this.controller.select(req, res);
    });
    
    // READ
    this.router.get('/:params',
    this.needsAuthenticate.read ? authenticateToken : nextFunc,
    async (req, res) => {
      return await this.controller.select(req, res);
    })
    
    //UPDATE
    this.router.put('/',
      this.needsAuthenticate.update ? authenticateToken : nextFunc,
      async (req, res) => {
        return await this.controller.update(req, res);
    });
    
    // DELETE
    this.router.delete('/',
      this.needsAuthenticate.delete ? authenticateToken : nextFunc,
      async (req, res) => {
        return await this.controller.delete(req, res);
    });
  }
  
}

module.exports = BaseRouter;