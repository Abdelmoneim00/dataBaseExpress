import dotenv from 'dotenv'
import { Pool } from 'pg';
import client from '../database';
import { User } from './../models/users';
import bcrypt from 'bcrypt'

dotenv.config()


async function authenticatePass(firstName: string, password: string): Promise<User | null> {
    const conn = await (client as Pool).connect()
    const sql = 'SELECT password FROM users WHERE firstname=($1)'

    const result = await conn.query(sql, [firstName])

    console.log(password+process.env.PEPPER)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password+process.env.PEPPER, user.password)) {
        return user
      }
      else {
        throw new Error('wrong firstname or password');
      }
    }

    return null
}

export default authenticatePass;