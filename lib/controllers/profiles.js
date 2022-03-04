const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Profile = require('../models/Profile');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      const newProfile = await Profile.insert({
        userId: req.user.id,
        score: req.body.score,
        bio: req.body.bio,
      });

      res.send(newProfile);
    }catch(error){
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try{
      const profileList = await Profile.getAllProfiles();

      res.send(profileList);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const singleProfile = await Profile.getProfileById(id);

      res.send(singleProfile);
    }catch(error){
      next(error);
    }
  })
  .patch('/:id', authenticate, async (req, res, next) => {
    try{
      const { id } = req.user;
      const existingProfile = await Profile.getProfileById(id);

      if(!existingProfile) return res.status(404).json({
        message: 'profile not found',
      });

      const updatedProfile = await Profile.updateProfile(existingProfile.userId, {
        bio: req.body.bio,
        score: req.body.score
      });
      res.send(updatedProfile);
    }catch(error){
      next(error);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try{
      const { id } = req.user;
      const deletedProfile = await Profile.deleteProfile(id);

      res.send(deletedProfile);
    }catch(error){
      next(error);
    }
  });
