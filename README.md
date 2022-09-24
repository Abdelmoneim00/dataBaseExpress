To get started:

1-clone this repo into your local machine

2-install all dependencies by running the command npm i/ yarn add (make sure to install db-migrate globally "npm i -g db-migrate")

3-create a .env file with all the required environment variables:

POSTGRES_HOST = "127.0.0.1"
POSTGRES_DB = your db for dev mode
POSTGRES_USER = your user
POSTGRES_PASSWORD = your password
POSTGRES_TEST_DB = your testing database
ENV = dev by default && can change it to test or prod
BCRYPT_PASSWORD= your BCRYPT pass
PEPPER = the letter you want to add as pepper
SALT_ROUNDS= number of rounds to run while crypting
ACCESS_TOKEN_SECRET= your token secret
4-Now, check if Postgres has the database database_dev, if not create it:

# Postgres shell
create database  back_end;
create database  back_end_test;
5-for running tests :
  A- make sure to run script "npm run reset" to reset all the data in database before testing.
  B- make sure you have db for testing before running tests.

7-database is running on host 127.0.0.1 and port 5432 and app is running on port 3000.

make sure to create order_product, user, and product before creating orders

Runing the program locally in development mode:
  A-`npm run start`
  B- after running the command head to the the url localhost:3000/
for checking the routes


Test the app
    `npm run test`
before you test the app
npm run reset
to reset all the data in the testing database

Runing the program locally in production mode
npm run build

node dist/index.js

scripts:
-"npm run reset to reset the data"
-"npm run test to test the project"
-"npm run build convert typescript to javascript in dist folder"
-"npm run start"
-"npm lint run eslint"
-"npm run prettier"