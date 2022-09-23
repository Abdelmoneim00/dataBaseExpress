import { User, users } from '../models/users';
import supertest from 'supertest';
import app from '../server';
import dotenv from 'dotenv';

dotenv.config();
let token: string;
const fakeToken: string = '12345472345254asfsh';
const Users = new users();
const requestt = supertest(app);

describe('users Model and endpoints', () => {
  it('expect index method for users to be definded', () => {
    expect(Users.index).toBeDefined();
  });
  it('expect show method for users to be definded', () => {
    expect(Users.show).toBeDefined();
  });
  it('expect create method for users to be definded', () => {
    expect(Users.create).toBeDefined();
  });
  it('should create a new user by using create endpoint with status OK', async () => {
    const user = {
      firstName: 'abdelmoneim',
      lastName: 'arabi',
      id: 1,
      password: '1234',
    };
    const response = await requestt
      .post('/users/create')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send(user);
    token = response.body.token;
    expect(response.status).toBe(200);
  });
  it('should show all users in index endpoint with status OK', async () => {
    const response = await requestt
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it('should return status 403 for invalid token when using index endpoint', async () => {
    const response = await requestt
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + fakeToken);
    expect(response.status).toBe(403);
  });
  it('should login successfully with login route', async () => {
    const response = await requestt
      .get('/users/login')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        firstName: 'abdelmoneim',
        password: '1234',
      });
    expect(response.status).toBe(200);
  });
  it('should return a token from login route', async () => {
    const response = await requestt
      .get('/users/login')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        firstName: 'abdelmoneim',
        password: '1234',
      });
    expect(response.body).toBeDefined();
  });
});
