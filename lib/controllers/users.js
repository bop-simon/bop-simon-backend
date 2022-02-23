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
  })
  .post('/sessions', async (req, res, next) => {
    try{
      const { username, password } = req.body;
      const userToken = await UserService.signinUser({ username, password });

      res.cookie(process.env.COOKIE_NAME, userToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      }).json({
        message: 'Signed in successfully',
      });

    }catch(error){
      next(error);
    }
  });
