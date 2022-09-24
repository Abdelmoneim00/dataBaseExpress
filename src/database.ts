import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client: Pool | unknown;

let {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  PORT,
} = process.env;

if (ENV == 'test') {
  console.log('test');
} else {
  console.log('dev');
}

if ((ENV = 'dev')) {
  client = new Pool({
    port : +(PORT as string) as number,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if ((ENV = 'test')) {
  client = new Pool({
    port : +(PORT as string) as number,
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
