const { Router } = require('express')
const UserSong = require('../models/UserSong.js')


module.exports = Router()
  .post('/', async (req, res, next) => {
    try{
      const newSong = await UserSong.insert({
        user_id: req.body.user_id,
        notes: req.body.notes
      });
      res.send(newSong);
    }catch(error){
      next(error)
    }
  })