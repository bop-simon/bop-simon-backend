const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try{
      const user = await UserService.create(req.body);
      res.send(user);
    }catch(error){
      next(error);
    }
  });
