const pool = require('../utils/pool')

module.exports = class UserSong {
  id;
  user_id;
  notes;
  created_at;

  constructor(row){
    this.id = row.id;
    this.user_id = row.user_id;
    this.notes = row.notes;
    this.created_at = row.created_at;
  }

  static async insert({ user_id, notes }){
    const { rows } = await pool.query(`
      INSERT INTO fav_songs (user_id, notes)
      VALUES ($1, $2)
      RETURNING *`, [user_id, notes])

    return new UserSong(rows[0])
  }
}