const request = require('supertest');
const app = require('../src/app');
const json = require('../src/v1/models/data.json');

let token = '';

const newUser = JSON.parse(
  JSON.stringify(json)
);

newUser.id = 2;
newUser.username = '002222';
newUser.password = process.env.TESTER;
newUser.level = 'Assistant';



beforeAll(async () => {
  await request(app).get('/v1/schema');

  const creds = {
    username: json.username,
    password: newUser.password
  };

  const response = await request(app).post('/v1/signin').send(creds);
  token = response.body.data[0].token;
});



describe('Check token', () => {
  test('token should not empty', () => {
    expect(token != '').toBe(true);
  });
});



describe('POST /v1/users', () => {
  test('insert user 2', async () => {
    const response = await request(app)
      .post('/v1/users')
      .send(newUser)
      .set('Authorization', token);
    expect(response.statusCode).toBe(201);
  });
});



describe('GET /v1/users', () => {
  test('get all users', async () => {
    const response = await request(app)
      .get('/v1/users')
      .set('Authorization', token);
    expect(response.body.data.length >= 1).toBe(true);
  });
});



describe('GET /v1/users/2', () => {
  test('get user 2', async () => {
    const response = await request(app)
      .get('/v1/users/2')
      .set('Authorization', token);
    expect(response.body.data.length >= 1).toBe(true);
  });
});



describe('PUT /v1/users/2', () => {
  test('update name of user 2 from Test to Try', async () => {
    newUser.firstname = 'Try';
    newUser.password = 'noupdate';

    const response = await request(app)
      .put('/v1/users/2')
      .send(newUser)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });

  test('user 2 name should be Try', async () => {
    const response = await request(app)
      .get('/v1/users/2')
      .set('Authorization', token);
    expect(response.body.data[0].firstname).toBe('Try');
  });
});



describe('DELETE /v1/users/2', () => {
  test('delete user 2', async () => {
    const response = await request(app)
      .delete('/v1/users/2')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });
});



describe('DELETE /v1/users?ids=3,4', () => {
  test('insert user 3', async () => {
    newUser.id = 3;
    newUser.username = '003333';

    const response = await request(app)
      .post('/v1/users')
      .send(newUser)
      .set('Authorization', token);
    expect(response.statusCode).toBe(201);
  });

  test('insert user 4', async () => {
    newUser.id = 4;
    newUser.username = '004444';
    newUser.level = 'Guest';

    const response = await request(app)
      .post('/v1/users')
      .send(newUser)
      .set('Authorization', token);
    expect(response.statusCode).toBe(201);
  });

  test('delete user 3 and 4', async () => {
    const response = await request(app)
      .delete('/v1/users?ids=3,4')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });
});