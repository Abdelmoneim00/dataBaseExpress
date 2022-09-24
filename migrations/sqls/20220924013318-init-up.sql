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
CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    order_id integer,
    product_id integer,
    quantity integer
);
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status VARCHAR(50),
    order_product_id bigint REFERENCES order_product(id)
);
