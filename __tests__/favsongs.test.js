const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserSong = require('../lib/models/FavSong.js');
const UserService = require('../lib/services/UserService');
const { signinUser } = require('../lib/services/UserService');
const User = require('../lib/models/User');

const agent = request.agent(app);

const mockSong = {
  user_id: 1,
  notes:'A7, B3, F2, G7, E2'
};

const mockSong1 = {
  user_id: 1,
  notes:'B4, G2, A2, F4, A2'
};

describe.only('fav songs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a new fav song', async () => {
    const mockUser = {
      username: 'anything',
      password: 'anywho',
    };

    const user = await UserService.create(mockUser);

    await agent.post('/api/v1/users/sessions').send({
      username: user.username,
      password: mockUser.password
    });

    const res = await agent.post('/api/v1/usersongs').send(mockSong);

    expect(res.body).toEqual({
      id: expect.any(String),
      user_id: '5',
      notes:'A7, B3, F2, G7, E2',
      created_at: expect.any(String),
    });
  });

  it.skip('should get all fav songs for one user', async () => {
    const mockUser = {
      username: 'nobody',
      password: 'yess'
    };

    const user = await UserService.create(mockUser);

    await agent.post('/api/v1/users/sessions').send({
      username: user.username,
      password: mockUser.password,
    });
    const song1 = await agent.post('/api/v1/usersongs').send(mockSong);

    console.log(song1);
    const song2 = await agent.post('/api/v1/usersongs').send(mockSong1);


    const res = await agent.get('/api/v1/usersongs');
    console.log(res.body, 'yoooooooooooo');
    expect(res.body).toEqual(
      expect.arrayContaining([{
        id: expect.any(String),
        ...song1,
        created_at: expect.any(String),
      }, {
        id: expect.any(String),
        ...song2,
        created_at: expect.any(String),
      }])
    );
  });

  it('should get delete a fav by ID', async () => {
    const song1 = await UserSong.insert(mockSong);

    const res = await agent.delete(`/api/v1/usersongs/${song1.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...song1,
      created_at: expect.any(String),
    });
  });
});
