const express = require('express');
const Router = express.Router;
const controllers = require('../controllers');
const authenticateToken = require('../middlewares/AuthenticateToken.middleware');

class BaseRouter {
  
  constructor(needsAuthenticate = {}){
    this.router = Router();
    this.name = this.constructor.name;
    this.table = this.name;
    this.controller = new controllers[this.table]();
    
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
        const response = await this.controller.create({body: req.body});
        
        res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    // READ
    this.router.get('/',
    this.needsAuthenticate.read ? authenticateToken : nextFunc,
    async (req, res) => {
      const response = await this.controller.get({body: req.body});
        
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    //UPDATE
    this.router.put('/',
    this.needsAuthenticate.update ? authenticateToken : nextFunc,
    async (req, res) => {
      const response = await this.controller.update({body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    // DELETE
    this.router.delete('/',
    this.needsAuthenticate.delete ? authenticateToken : nextFunc,
    async (req, res) => {
      const response = await this.controller.delete({body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
  }
  
}

module.exports = BaseRouter;