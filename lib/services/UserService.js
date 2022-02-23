const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService{
  static async create({ email, password }){
    const hashPassword = bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const user = await User.insert({ email, hashPassword });

    return user;
  }
};
