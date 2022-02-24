const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  #passwordHash;
  created_at;
  score;
  songs;

  constructor(row){
    this.id = row.id;
    this.username = row.username;
    this.#passwordHash = row.password_hash;
    this.created_at = row.created_at;
    this.score = row.score;
    this.songs = row.songs;
  }

  static async insert({ username, passwordHash, score, songs }){
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash, score, songs)
      VALUES ($1, $2, $3, $4)
      RETURNING *`, [username, passwordHash, score, songs]);

    return new User(rows[0]);
  }
  static async getById(id){
    const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE id = $1`, [id]);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  static async updateUser(id, { username, passwordHash, score, songs }){
    const { rows } = await pool.query(`
    UPDATE users
    SET username=$2, password_hash=$3, score=$4, songs=$5
    WHERE id=$1
    RETURNING *`, [id, username, passwordHash, score, songs]);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  static async getByUsername({ username }){
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE username = $1`, [username]);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  static async getAllUsers(){
    const { rows } = await pool.query(`
    SELECT username, score,
    RANK() OVER(ORDER BY score DESC)
    FROM users
    WHERE score IS NOT NULL`);

    return rows.map((row) => new User(row));
  }
  get passwordHash(){
    return this.#passwordHash;
  }
};
