const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const agent = request.agent(app);

describe('user routes test', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('should create a new user', async () => {
    const mockUser = {
      username: 'myusername',
      password: 'anyword',
      score: '50',
      songs: '1',
    };

    await UserService.create(mockUser);

    const res = await agent.post('/api/v1/users').send(mockUser);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'myusername',
      score: '50',
      songs: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it('should sign in a user', async () => {
    const mockUser =  {
      username: 'myusername',
      password: 'anyword'
    };

    await UserService.create(mockUser);

    const res = await agent.post('/api/v1/users/sessions').send(mockUser);

    expect(res.body).toEqual({
      message: 'Signed in successfully',
    });

  });
  it('should get user by id', async () => {
    const mockUser = {
      username: 'myusername',
      password: 'anyword',
      score: '50',
      songs: '1',
    };

    const newUser = await UserService.create(mockUser);

    const res = await agent.get(`/api/v1/users/${newUser.id}`);

    expect(res.body).toEqual({ ...newUser, id: expect.any(String), created_at: expect.any(String) });

  });
  it('should logout a user', async () => {
    const mockUser =  {
      username: 'myusername',
      password: 'anyword'
    };

    const res = await agent.delete('/api/v1/users/sessions').send(mockUser);

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully',
    },
    { id: expect.any(String),
      created_at: expect.any(String),
      score: expect.any(String),
      songs: expect.any(String),
    },
    );
  });
});
