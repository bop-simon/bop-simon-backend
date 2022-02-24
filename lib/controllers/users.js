const { Router } = require('express');
const User = require('../models/User');
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
  })
  .get('/leaderboard', async (req, res, next) => {
    try{
      const leaderList = await User.getAllUsers();


      res.send(leaderList);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const singleUser = await User.getById(id);

      res.send(singleUser);
    }catch(error){
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const existingUser = await User.getById(id);
      if(!existingUser) return res.status(404).json({
        message: 'user not found',
      });

      const updatedUser = await UserService.updateUserInfo({ ...req.body, userId : id });

      res.send(updatedUser);
    }catch(error){
      next(error);
    }
  })

  .delete('/sessions', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully' });
  });
