install all dependencies by running command

```npm  install```
create a .env file with all the required environment variables:

  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  ACCESS_TOKEN_SECRET,

run `npm run build` to build the app
run ```npm run test``` to start testing 

7-database is run on localhost port 5432 the project is running on port 3000

Runing the program locally in development mode
npm run start

-and then head to your browser at localhost:3000 and it should be working.

Runing the program locally in production mode
npm run build

node dist/index.js

`npm run prettier` for code formatting

`npm run lint` to use eslint

