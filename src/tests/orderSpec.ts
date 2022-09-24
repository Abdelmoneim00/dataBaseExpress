import { User, users } from '../models/users';
import {Store, product} from '../models/products'
import supertest from 'supertest';
import app from '../server';
import { Order,orderProduct,orders } from '../models/orders';

const Orders = new orders;
const requestt = supertest(app);
let token : string;

const newStore = new Store;

describe('Order Model and endpoints', () => {
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
    it('should create a new order with addOrder method', async () => {
        const result = await Orders.addOrder({
            id : 1,
            order_id : 1,
            product_id : 1,
            quantity : 50
        });
        expect(result).toEqual([{
            id : 1,
            product_id : 1,
            order_id : 1,
            quantity : 50
        }]);
    });
    it('should add a new order with the addOrder route', async () => {
        const response = await requestt.post('/orders/addOrder')
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({quantity : 50, order_id : 2, id : 2, product_id : [1]});
        expect(response.body).toEqual([{order_id : 2, quantity : 50, id : 2, product_id : 1}]);
    });
    it('should create a new order with create route and return status OK', async () => {
        const newOrder: Order = {
            user_id : 2,
            status : 'active',
            id : 1,
            order_product_id: [1]
        }
        const response = await requestt.post('/orders/create')
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send(newOrder);
        expect(response.status).toBe(200);
    });
    it('should create a new order with create route and return the correct object of the new order', async () => {
        const newOrder: Order = {
            user_id : 2,
            status : 'active',
            id : 2,
            order_product_id: [1]
        }
        const response = await requestt.post('/orders/create')
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send(newOrder);
        expect(response.body).toEqual({user_id : '2',status : 'active',id : 2, order_product_id : '1'});
    })
    it('show order method should return the currect order', async () => {
        expect(Orders.showOrder(1)).toBeTruthy();
    });
})