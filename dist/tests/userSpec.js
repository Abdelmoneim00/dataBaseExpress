"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let token;
const fakeToken = '12345472345254asfsh';
const Users = new users_1.users();
const requestt = (0, supertest_1.default)(server_1.default);
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
