const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const User = require('../lib/models/User');

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
    };

    const res = await agent.post('/api/v1/users/signup').send(mockUser);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'myusername',
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
  it('should get the leaderboard', async () => {
    const mockUser = {
      username: 'anyone',
      password: 'anyword',
    };


    await UserService.create(mockUser);

    const res = await agent.get('/api/v1/users/leaderboard');

    expect(res.body).toEqual([{ username: 'bop-simon', score: '1500' }, { username: 'hoosier_mama', score: '1300' }, { username: 'hogwarts_dropout', score: '1200' }, { username: 'kiss_my_axe', score: '1000' }]);
  });
  it('should get all users', async () => {

    const res = await agent.get('/api/v1/users');

    expect(res.body).toEqual([{ id: expect.any(String), username: 'bop-simon', created_at: expect.any(String) }, { id: expect.any(String), username: 'hoosier_mama', created_at: expect.any(String) }, { id: expect.any(String), username: 'hogwarts_dropout', created_at: expect.any(String) }, { id: expect.any(String), username: 'kiss_my_axe', created_at: expect.any(String) }]);
  });
  it('should get user by id', async () => {


    const res = await agent.get('/api/v1/users/1');

    expect(res.body).toEqual({ id: expect.any(String), username: 'bop-simon', created_at: expect.any(String), score: expect.any(String), bio: 'simon the all time master of the bop', notes: 'c2, c4, d2, e2, f2, g3, a2, b3' });

  });

  it('should update existing user', async () => {
    const mockUser = {
      username: 'myusername',
      password: 'anyword',
    };

    const newUser = await UserService.create(mockUser);

    await agent.post('/api/v1/users/sessions').send({ username: newUser.username, password: mockUser.password });

    const res = await agent.patch(`/api/v1/users/${newUser.id}`)
      .send({
        username: 'newusername',
        password: 'anythingnow',
        score: '700',
        bio: 'new to the bop simon world',
        notes: 'c2, d3, b2',
      });

    const updatedUser = {
      id: expect.any(String),
      username: 'newusername',
      created_at: expect.any(String),
    };

    expect(res.body).toEqual(updatedUser);
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
    }
    );
  });

  it('should delete a user', async () => {
    const mockUser = {
      username: 'hellomatey',
      password: 'goodbyematey'
    };
    const user = await UserService.create(mockUser);

    await agent.post('/api/v1/users/sessions').send({ username: user.username, password: mockUser.password });

    const res = await agent.delete(`/api/v1/users/${user.id}`);


    expect(res.body).toEqual({ id: expect.any(String),
      username: 'hellomatey',
      created_at: expect.any(String),
      score: undefined,
      bio: undefined,
      notes: undefined });
    expect(await User.deleteUser(user.id)).toBeNull();
  });
});
