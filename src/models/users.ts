import { Pool } from 'pg';
import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

let { SALT_ROUNDS, PEPPER } = process.env;

dotenv.config();

export type User = {
  id: Number;
  firstName: String;
  lastName: String;
  password: String;
};

export class users {
  async index(): Promise<User[] | User> {
    try {
      const conn = await (client as Pool).connect();
      const sql = 'SELECT * FROM user';
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can not get list of users ${err}`);
    }
  }
  async show(id: Number): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await (client as Pool).connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users ${id}. Error: ${err}`);
    }
  }
  async create(u: User): Promise<User[]> {
    try {
      const sql =
        'INSERT INTO users (firstName, lastName, id, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await (client as Pool).connect();

      const hashsy = bcrypt.hashSync(
        ((u.password as string) + PEPPER) as string,
        +(SALT_ROUNDS as string) as number
      );

      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.id,
        hashsy,
      ]);

      const item = result.rows[0];

      conn.release();

      return item;
    } catch (err) {
      throw new Error(`Could not add new ${u.firstName}. Error: ${err}`);
    }
  }
}
