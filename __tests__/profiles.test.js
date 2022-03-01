const pool = require('../lib/utils/pool');
const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Profile = require('../lib/models/Profile');

const agent = request.agent(app);

describe('testing profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end;
  });

  it('should create a user profile', async () => {
    const mockProfile = {
      score: '1000',
      bio: 'mocking out a bio'
    };
    const newUser = {
      username: 'odoyle_rules',
      password: 'anything',
    };

    const user = await UserService.create(newUser);

    await agent.post('/api/v1/users/sessions').send({ username: user.username, password: newUser.password });

    const res = await agent.post('/api/v1/profiles').send(mockProfile);

    expect(res.body).toEqual({
      userId: '5',
      id: expect.any(String),
      score: '1000',
      bio: 'mocking out a bio'
    });
  });
  it('should get list of profiles', async () => {
    const res = await agent.get('/api/v1/profiles');

    expect(res.body).toEqual(expect.arrayContaining([{
      userId: '1',
      username: 'bop-simon',
      score: '1500',
      bio: 'simon the all time master of the bop'
    }]));
  });
  it('should get a profile by id', async () => {
    const res = await agent.get('/api/v1/profiles/3');

    expect(res.body).toEqual({
      userId: '3',
      username: 'hogwarts_dropout',
      score: '1200',
      bio: 'a dropout of hogwarts who realized magic was not for him'
    });
  });
  it('should update existing profile', async () => {
    const mockProfile = {
      score: '900',
      bio: 'mock bio'
    };
    const newUser = {
      username: 'thingone',
      password: 'anything',
    };

    const user = await UserService.create(newUser);

    await agent.post('/api/v1/users/sessions').send({ username: user.username, password: newUser.password });


    const profile = await agent.post('/api/v1/profiles').send(mockProfile);


    const res = await agent.patch(`/api/v1/profiles/${profile.body.id}`).send({
      score: '1200',
      bio: 'mocking out a new bio'
    });
    const updatedProfile = {
      id: expect.any(String),
      userId: expect.any(String),
      score: '1200',
      bio: 'mocking out a new bio'
    };

    expect(res.body).toEqual(updatedProfile);
  });
  it('should delete profile information', async () => {
    const mockUser = {
      username: 'mockuser',
      password: 'mockpassword'
    };

    const mockProfile = {
      score: '500',
      bio: 'mocking out a profile bio',
    };

    const user = await UserService.create(mockUser);
    await agent.post('/api/v1/users/sessions').send({ username: user.username, password: mockUser.password });

    const profile = await agent.post('/api/v1/profiles').send(mockProfile);

    const res = await agent.delete(`/api/v1/profiles/${profile.userId}`);

    expect(res.body).toEqual({
      bio: 'mocking out a profile bio',
      id: expect.any(String),
      score: expect.any(String),
      userId: expect.any(String)
    });
    expect(await Profile.deleteProfile(profile.userId)).toBeNull();
  });
});
