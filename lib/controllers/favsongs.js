const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const FavSong = require('../models/FavSong.js');


module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      const newSong = await FavSong.insert({
        user_id: req.user_id,
        notes: req.body.notes
      });

      res.send(newSong);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const userSongs = await FavSong.getSongsByUserId(id);

      res.send(userSongs);
    }catch(error){
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const song = await FavSong.deleteById(id);

    res.send(song);
  });
