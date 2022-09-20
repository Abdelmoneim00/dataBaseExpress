import { Pool } from 'pg';
import client from '../database';

export type product = {
  id: Number;
  name: String;
  price: Number;
};

export class Store {
  async index(): Promise<product[] | product> {
    try {
      const conn = await (client as Pool).connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can not get list of products ${err}`);
    }
  }
  async show(id: Number): Promise<product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await (client as Pool).connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(p: product): Promise<product[]> {
    try {
      const sql =
        'INSERT INTO products (name, price, id) VALUES($1, $2, $3) RETURNING *';
      const conn = await (client as Pool).connect();

      const result = await conn.query(sql, [p.name, p.price, p.id]);

      const item = result.rows[0];

      conn.release();

      return item;
    } catch (err) {
      throw new Error(`Could not add new item ${p.name}. Error: ${err}`);
    }
  }
}
