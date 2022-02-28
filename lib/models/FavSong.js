const pool = require('../utils/pool')

module.exports = class FavSong {
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

    return new FavSong(rows[0])
  }

  static async getSongsByUserId(user_id ){
    const { rows } = await pool.query(`
      SELECT * 
      FROM fav_songs 
      WHERE user_id = $1`, [user_id])
    return rows.map((row) => new FavSong(row)) 
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM fav_songs WHERE id=$1 RETURNING *', [id])

    if (!rows[0]) return null

    return new FavSong(rows[0])
  }
}