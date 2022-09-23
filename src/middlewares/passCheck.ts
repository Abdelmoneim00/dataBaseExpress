import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import client from '../database';
import bcrypt from 'bcrypt';

dotenv.config();

async function authenticatePass(
  firstName: string,
  password: string
): Promise<string | null> {
  const conn = await (client as Pool).connect();
  const sql = 'SELECT * FROM users WHERE firstname=($1)';

  const result = await conn.query(sql, [firstName]);

  if (result.rows.length) {
    const user = result.rows[0];
    if (bcrypt.compareSync(password + process.env.PEPPER, user.password)) {
      let token = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET as string);
      return token;
    } else {
      throw new Error('wrong firstname or password');
    }
  }

  return null;
}

export default authenticatePass;
