const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  #passwordHash;

  constructor(row){
    this.id = row.id;
    this.username = row.username;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ username, passwordHash }){
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2)
      RETURNING *`, [username, passwordHash]);

    return new User(rows[0]);
  }

  static async getByUsername({ username }){
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE username = $1`, [username]);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }
  get passwordHash(){
    return this.#passwordHash;
  }
};
