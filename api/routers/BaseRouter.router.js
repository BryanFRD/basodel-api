const express = require('express');
const Router = express.Router;
const controllers = require('../controllers');

class BaseRouter {
  
  constructor(){
    this.router = Router();
    this.name = this.constructor.name;
    this.table = this.name;
    this.controller = new controllers[this.table]();
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    
    // CREATE
    this.router.post('/', async (req, res) => {
      const response = await this.controller.create({body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    // READ
    this.router.get('/', async (req, res) => {
      const response = await this.controller.get({body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    this.router.get('/:id', async (req, res) => {
      const response = await this.controller.get({id: req.params.id, body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    //UPDATE
    this.router.put('/', async (req, res) => {
      const response = await this.controller.update({body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    this.router.put('/:id', async (req, res) => {
      const response = await this.controller.update({id: req.params.id, body: req.body});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
    
    // DELETE
    this.router.delete('/:id', async (req, res) => {
      const response = await this.controller.delete({id: req.params.id});
      
      res.status(response?.statusCode ?? res.statusCode).send(response.content);
    });
  }
  
}

module.exports = BaseRouter;