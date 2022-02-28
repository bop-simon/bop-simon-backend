const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const agent = request.agent(app);

describe.skip('user routes test', () => {
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

    await UserService.create(mockUser);

    const res = await agent.post('/api/v1/users').send(mockUser);

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
  //   it('should get the leaderboard', async () => {
  //     const mockUser = {
  //       username: 'anyone',
  //       password: 'anyword',
  //     };


  //     await UserService.create(mockUser);

  //     const res = await agent.get('/api/v1/users/leaderboard');

  //     expect(res.body).toEqual([{ username: 'jakethesnake', score: '1500' }, { username: 'hoosier_mama', score: '1250' }, { username: 'hogwarts_dropout', score: '1000' }, { username: 'kiss_my_axe', score: '1000' }, { username: 'anyone', score: '1000' },  { username: 'hairypoppins', score: '900' }]);
  //   });
  //   it('should get all users', async () => {
  //     const mockUser = {
  //       username: 'jakethesnake',
  //       password: 'anyword',
  //       score: '1500',
  //       songs: '5'
  //     };

  //     const newUser = await UserService.create(mockUser);

  //     const res = await agent.get('/api/v1/users');

  //     expect(res.body).toEqual([{ ...newUser, id: expect.any(String), created_at: expect.any(String) }, { created_at: expect.any(String), id: expect.any(String), score: expect.any(String), songs: expect.any(String), username: 'hoosier_mama' },  { created_at: expect.any(String), id: expect.any(String), score: expect.any(String), songs: expect.any(String), username: 'hogwarts_dropout' },  { created_at: expect.any(String), id: expect.any(String), score: expect.any(String), songs: expect.any(String), username: 'kiss_my_axe' },  { created_at: expect.any(String), id: expect.any(String), score: expect.any(String), songs: expect.any(String), username: 'hairypoppins' },  { created_at: expect.any(String), id: expect.any(String), score: expect.any(String), songs: expect.any(String), username: 'jakethesnake' }]);
  //   });
  //   it('should get user by id', async () => {
  //     const mockUser = {
  //       username: 'myusername',
  //       password: 'anyword',
  //       score: '50',
  //       songs: '1',
  //     };

  //     const newUser = await UserService.create(mockUser);

  //     const res = await agent.get(`/api/v1/users/${newUser.id}`);

  //     expect(res.body).toEqual({ ...newUser, id: expect.any(String), created_at: expect.any(String) });

  //   });

  //   it('should update existing user', async () => {
  //     const mockUser = {
  //       username: 'myusername',
  //       password: 'anyword',
  //       score: '50',
  //       songs: '1',
  //     };

  //     const newUser = await UserService.create(mockUser);

  //     const res = await agent.patch(`/api/v1/users/${newUser.id}`)
  //       .send({
  //         username: 'newusername',
  //         password: 'anythingnow',
  //         score: '50',
  //         songs: '1',
  //       });

  //     const updatedUser = {
  //       id: expect.any(String),
  //       username: 'newusername',
  //       score: '50',
  //       songs: '1',
  //       created_at: expect.any(String),
  //     };

  //     expect(res.body).toEqual(updatedUser);
  //   });


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
