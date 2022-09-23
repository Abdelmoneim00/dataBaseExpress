import { product, Store } from '../models/products';
import supertest from 'supertest';
import app from '../server';

const requestt = supertest(app);

const store = new Store();

describe('Store Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      id: 1,
      name: 'mango',
      price: 50,
    });
    expect(result as unknown | Promise<product>).toEqual({
      id: 1,
      name: 'mango',
      price: 50,
    });
  });

  it('index method should return a list of product', async () => {
    const result = await store.index();
    expect(result as unknown | Promise<product>).toEqual({
      id: 2,
      name: 'pinable',
      price: 50,
    });
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result as unknown | Promise<product>).toEqual({
      name: 'mango',
      id: 1,
      price: 50,
    });
  });

  it('should return OK status', async (): Promise<void> => {
    const call = await requestt.get('/products');
    expect(call.status).toBe(200);
  });

  it('should return OK status for products endpoint', async (): Promise<void> => {
    const call = await requestt.get('/products');
    expect(call.status).toBe(200);
  });
  it('should return 401 response with unauthorized', async () => {
    const response = await requestt
      .post('/products/create')
      .set('Content-type', 'application/json')
      .send({
        name: 'kiwi',
        product_price: 50,
        id: 2,
      });
    expect(response.status).toBe(401);
  });
  it('should return the product id from the show endpoint', async () => {
    const response = await requestt
      .get('/products/show')
      .set('Content-type', 'application/json')
      .send({ id: 1 });
    expect(response.status).toBe(200);
  });
});
