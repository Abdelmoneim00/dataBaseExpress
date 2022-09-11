import { Store } from "../models/products";

const store = new Store

describe("Store Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create({
        id: 1,
        name : "mango",
        price : 50
    });
    expect(result).toEqual([{
      id: 1,
      name : "mango",
      price : 50
    }]);
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        id: 1,
        name : "mango",
        price : 50
    }]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show(1);
    expect(result).toEqual([{
        name : 'mango',
        id: 1,
        price : 50
    }]);
  });
});