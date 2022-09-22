import { Pool } from 'pg';
import client from '../database';

export type Order = {
  id: number;
  user_id: number;
  status: string;
  product_id: number[];
  quantity: number[];
};

export class orders {
  async showOrder(id: number): Promise<Order[]> {
    try {
      const conn = await (client as Pool).connect();
      const sql = 'SELECT product_id,quantity from order_product where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can not get information about order ${err}`);
    }
  }
  async showUserOrder(user_id: number): Promise<Order[]> {
    try {
      const conn = await (client as Pool).connect();
      const sql = 'SELECT id, status, quantity from orders where user_id=($1)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get user orders ${err}`);
    }
  }
  async createOrder(o: Order): Promise<Order[]> {
    try {
      const conn = await (client as Pool).connect();
      const sql =
        'INSERT INTO orders(user_id,status,quantity,product_id) values ($1,$2,$3) returning *';
      const user_result = await conn.query(sql, [
        o.user_id,
        o.status,
        o.id,
        o.quantity,
        o.product_id,
      ]);
      conn.release();
      return user_result.rows[0];
    } catch (error) {
      throw new Error(`could not create new order ${error}`);
    }
  }
}
