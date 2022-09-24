# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
localhost:3000/products [GET]

{no request body required}

- Show
localhost:3000/products/show [GET]

request.body for show route :
{
    id : 1 (any number of existing product)
}

- Create [token required] 
localhost:3000/products/create [POST]

request.body for create route :
{
    id:  number, <= must be a number
    name:  'name of existing product', <= must be a string
    price: number, <= must be a number
    token: string, <= the token you get when sign a new user or login
}

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
localhost:3000/users [GET]

request.body for the users route :
{
    token : string, <= the token you get when you sign in a new user or log in
}

- Show [token required]
localhost:3000/users/show [GET]

request.body for the users/show route : 
{
    id : number, <= must be a number
    token : string, <= the token you get when you sign in new user or log in
}

- Create N[token required]
localhost:3000/users/create [POST]

response.body for the users/create route :
{
    firstName: string, <= must be a string
    lastName: string, <= must be a string
    id: number, <= must be a unique number
    password: 'string', <= must be a string
}

#### Orders
- Current Order by user (args: user id)[token required]
localhost:3000/orders/show (to show an order) [GET]

request.body for the orders/show route :
{
    id : number, <= number of existing order
    token : string, <= the token you get from signing a new user or logging in
}

localhost:3000/orders/create (to create new order) [POST]

response.body for the orders/create route :
{
    user_id : number, <= id of current user signed in in the database
    status : string, <= active or complete
    id : number, <= number of the order itself
    order_product_id : [product1,produc2,product3], <= id of each product (must create one first)
    token : string , <= token that you get after siging in new user or logging in
}

addOrder [token required]
/orders/addOrder [POST]

response.body for the orders/create route :
{
    order_id : number, <= id of order in the database orders table
    id : number, <= number of the order_product itself
    quantity : [number1], <= quantity of each product in numbers
    product_id : [product1,produc2,product3], <= id of each product (must create one first)
    token : string , <= token that you get after siging in new user or logging in
}

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

table schema for products (
    name VARCHAR(50),
    price integer,
    id SERIAL PRIMARY KEY
);

#### User
- id
- firstName
- lastName
- password

table schema for users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password VARCHAR(500)
);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
table schema for orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status VARCHAR(50),
    product_id bigint REFERENCES products(id),
    quantity integer
);

#### order_product

CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    order_id integer,
    product_id integer,
    quantity integer
);
