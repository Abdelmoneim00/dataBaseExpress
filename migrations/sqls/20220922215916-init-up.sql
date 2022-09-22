CREATE TABLE products (
    name VARCHAR(50),
    price integer,
    id SERIAL PRIMARY KEY
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(200)
);
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer,
    status VARCHAR(50),
    product_id integer,
    quantity integer
);