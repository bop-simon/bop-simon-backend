const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserSong = require('../lib/models/UserSong.js');

const agent = request.agent(app);

mockSong = {
  user_id: 1,
  notes:'A7, B3, F2, G7, E2'
}

describe.only('user songs routes', () => {
  beforeEach(() => {
    return setup(pool)
  })

  afterAll(() => {
    pool.end()
  })

  it.only('should create a new user song', async () => {
    await UserSong.insert(mockSong)

    const res = await agent.post('/api/v1/usersongs').send(mockSong)

    expect(res.body).toEqual({
      id: expect.any(String),
      user_id: "1",
      notes:'A7, B3, F2, G7, E2',
      created_at: expect.any(String),
    })
  })

  //bottom of describe block
})