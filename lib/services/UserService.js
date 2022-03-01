const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ username, password }){

    let user = await User.getByUsername({ username });
    if(!user) {
      const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
      user = await User.insert({
        username,
        passwordHash,
      });
    }
    return user;
  }


  static async signinUser({ username, password = '' }){
    try {
      const existingUser = await User.getByUsername({ username });
      if(!existingUser) throw new Error('User does not exist');
      if(!bcrypt.compareSync(password, existingUser.passwordHash))
        throw new Error('Password Incorrect');

      const webToken = jwt.sign({ ...existingUser }, process.env.JWT_SECRET);

      return webToken;
    }catch(error){
      error.status = 401;
      throw error;
    }

  }
  static async updateUserInfo({ userId, username, password, score, songs  }){
    let hashPassword;
    if(password) hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const user = await User.getById(userId);
    const newUserInfo = {
      passwordHash: hashPassword ?? user.passwordHash,
      username: username ?? user.username,
      score: score ?? user.score,
      songs: songs ?? user.songs,
    };
    return await User.updateUser(userId, newUserInfo);
  }
};
