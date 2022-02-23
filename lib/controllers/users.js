const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try{
      const newUser = await UserService.create(req.body);
      res.send(newUser);
    }catch(error){
      next(error);
    }
  });
