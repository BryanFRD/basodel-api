const express = require('express');
const Router = express.Router;
const controllers = require('../controllers');

class BaseRouter {
  
  constructor(){
    this.router = Router();
    this.name = this.constructor.name;
    this.table = this.name.replace('Router', '');
    this.controller = new controllers[`${this.table}Controller`]();
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    // CREATE
    this.router.post('/',
      async (req, res) => {
        return await this.controller.create(req, res);
    });
    
    // READ
    this.router.get('/',
      async (req, res) => {
        return await this.controller.select(req, res);
    });
    
    // UPDATE
    this.router.put('/',
      async (req, res) => {
        return await this.controller.update(req, res);
    });
    
    // DELETE
    this.router.delete('/',
      async (req, res) => {
        return await this.controller.delete(req, res);
    });
  }
  
}

module.exports = BaseRouter;