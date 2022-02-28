const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserSong = require('../lib/models/FavSong.js');

const agent = request.agent(app);

mockSong = {
  user_id: 1,
  notes:'A7, B3, F2, G7, E2'
}

mockSong1 = {
  user_id: 1,
  notes:'B4, G2, A2, F4, A2'
}

describe.only('fav songs routes', () => {
  beforeEach(() => {
    return setup(pool)
  })

  afterAll(() => {
    pool.end()
  })

  it('should create a new fav song', async () => {
    const res = await agent.post('/api/v1/usersongs').send(mockSong)

    expect(res.body).toEqual({
      id: expect.any(String),
      user_id: "1",
      notes:'A7, B3, F2, G7, E2',
      created_at: expect.any(String),
    })
  })

  it('should get all fav songs for one user', async () => {
    const song1 = await UserSong.insert(mockSong)
    const song2 = await UserSong.insert(mockSong1)
    
    const res = await agent.get('/api/v1/usersongs/1')

    expect(res.body).toEqual(
      expect.arrayContaining([{
      id: expect.any(String),
      ...song1,
      created_at: expect.any(String),
    },{
      id: expect.any(String),
      ...song2,
      created_at: expect.any(String),
    }])  
  )
  })

  it('should get delete a fav by ID', async () => {
    const song1 = await UserSong.insert(mockSong)
    
    const res = await agent.delete(`/api/v1/usersongs/${song1.id}`)

    expect(res.body).toEqual({
      id: expect.any(String),
      ...song1,
      created_at: expect.any(String),
    })
  })
})