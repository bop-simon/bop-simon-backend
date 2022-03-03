const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  #passwordHash;
  created_at;
  score;
  bio;
  notes;

  constructor(row){
    this.id = row.id;
    this.username = row.username;
    this.#passwordHash = row.password_hash;
    this.created_at = row.created_at;
    this.score = row.score;
    this.bio = row.bio;
    this.notes = row.notes;
  }

  static async insert({ username, passwordHash }){
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2)
      RETURNING *`, [username, passwordHash]);

    return new User(rows[0]);
  }
  static async getById(id){
    const { rows } = await pool.query(`
    SELECT username, users.created_at, notes, score, bio
    FROM users
    LEFT JOIN profiles
    ON profiles.user_id = users.id
    LEFT JOIN fav_songs
    ON fav_songs.user_id = users.id
    WHERE users.id = $1`, [id]);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }

  static async updateUser(id, { username, passwordHash }){
    const { rows } = await pool.query(`
    UPDATE users
    SET username=$2, password_hash=$3
    WHERE id=$1
    RETURNING *`, [id, username, passwordHash]);

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

  static async getHighScores(){
    const { rows } = await pool.query(`
    SELECT username, score,
    RANK() OVER(ORDER BY score DESC)
    FROM users
    INNER JOIN profiles
    ON profiles.user_id = users.id
    WHERE score IS NOT NULL`);

    return rows.map((row) => new User(row));
  }

  static async getAllUsers(){
    const { rows } = await pool.query(`
    SELECT * FROM users`);

    return rows.map((row) => new User(row));
  }
  static async deleteUser(id){
    const { rows } = await pool.query(`
    DELETE FROM users
    WHERE id=$1
    RETURNING *`, [id]);

    if(!rows[0]) return null;

    return new User(rows[0]);
  }
  get passwordHash(){
    return this.#passwordHash;
  }
};
