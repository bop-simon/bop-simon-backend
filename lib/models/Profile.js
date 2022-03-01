const pool = require('../utils/pool');


module.exports = class Profile {
  id;
  userId;
  username;
  score;
  bio;

  constructor(row){
    this.id = row.id;
    this.userId = row.user_id;
    this.username = row.username;
    this.score = row.score;
    this.bio = row.bio;
  }

  static async insert({ userId, score, bio }){
    const { rows } = await pool.query(`
      INSERT INTO profiles(user_id, score, bio)
      VALUES ($1, $2, $3)
      RETURNING *`, [userId, score, bio]);

    return new Profile(rows[0]);
  }

  static async getAllProfiles(){
    const { rows } = await pool.query(`
      SELECT username, score, bio, user_id
      FROM profiles
      INNER JOIN users
      ON profiles.user_id = users.id`);

    return rows.map((row) => new Profile(row));
  }

  static async getProfileById(id){
    const { rows } = await pool.query(`
      SELECT username, score, bio, user_id
      FROM profiles
      INNER JOIN users
      ON profiles.user_id = users.id
      WHERE profiles.id=$1`, [id]);

    if(!rows[0]) return null;

    return new Profile(rows[0]);
  }

  static async updateProfile(id, { score, bio }){
    const { rows } = await pool.query(`
      UPDATE profiles
      SET score=$2, bio=$3
      WHERE id=$1
      RETURNING *`, [id, score, bio]);

    if(!rows[0]) return null;

    return new Profile(rows[0]);
  }

  static async deleteProfile(id){
    const { rows } = await pool.query(`
      DELETE FROM profiles
      WHERE user_id=$1
      RETURNING *`, [id]);

    if(!rows[0]) return null;

    return new Profile(rows[0]);
  }

};
