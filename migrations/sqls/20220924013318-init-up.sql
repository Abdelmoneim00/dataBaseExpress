CREATE TABLE products (
    name VARCHAR(50),
    price integer,
    id SERIAL PRIMARY KEY
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password VARCHAR(500)
);
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(15)
);
CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    quantity integer
);
