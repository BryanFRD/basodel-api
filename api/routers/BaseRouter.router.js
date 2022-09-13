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
    // CREATE
    const nextFunc = (req, res, next) => { next(); }
    
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
    
    this.router.get('/:id',
    this.needsAuthenticate.read ? authenticateToken : nextFunc,
      async (req, res) => {
        const response = await this.controller.get({id: req.params.id, body: req.body});
        
        res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    //UPDATE
    this.router.put('/',
    this.needsAuthenticate.update ? authenticateToken : nextFunc,
      async (req, res) => {
        const response = await this.controller.update({body: req.body});
      
        res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    this.router.put('/:id',
    this.needsAuthenticate.update ? authenticateToken : nextFunc,
      async (req, res) => {
        const response = await this.controller.update({id: req.params.id, body: req.body});
      
        res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    // DELETE
    this.router.delete('/:id',
    this.needsAuthenticate.delete ? authenticateToken : nextFunc,
      async (req, res) => {
        const response = await this.controller.delete({id: req.params.id});
      
        res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
  }
  
}

module.exports = BaseRouter;