"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const orders_1 = require("../models/orders");
const Orders = new orders_1.orders;
const requestt = (0, supertest_1.default)(server_1.default);
let token;
const newStore = new products_1.Store;
describe('Order Module and endpoints', () => {
    it('login a user to get token', async () => {
        const response = await requestt
            .post('/users/create')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .send({
            firstName: 'test',
            lastName: 'test',
            id: 2,
            password: '3333',
        });
        token = response.body.token;
        expect(response.status).toBe(200);
    });
    it('create new product', async () => {
        await newStore.create({
            id: 2,
            name: 'pinable',
            price: 50,
        });
    });
    it('expect showOrder method to be defined', () => {
        expect(Orders.showOrder).toBeDefined();
    });
    it('expect showUserOrder method to be defined', () => {
        expect(Orders.showUserOrder).toBeDefined();
    });
    it('expect createOrder method to be defined', () => {
        expect(Orders.createOrder).toBeDefined();
    });
    it('should create a new order with create route and return status OK', async () => {
        const newOrder = {
            user_id: 1,
            status: 'active',
            id: 1,
            quantity: [3],
            product_id: [2],
        };
        const response = await requestt.post('/orders/create')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(newOrder);
        expect(response.status).toBe(200);
    });
    it('show order method should return the currect order', async () => {
        expect(Orders.showOrder(1)).toBeTruthy();
    });
});
