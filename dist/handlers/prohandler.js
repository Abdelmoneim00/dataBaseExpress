"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const store = new products_1.Store;
const index = async (_req, res) => {
    const returnP = await store.index();
    res.json(returnP);
};
const show = async (req, res) => {
    let id = req.params.id;
    try {
        const returnP = await store.show(+id);
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the item, maybe try creating it first? ${err}`);
    }
};
const create = async (req, res) => {
    let name = req.params.name;
    let price = req.params.price;
    let Id = req.params.id;
    try {
        const returnP = await store.create({
            id: +Id,
            name: name,
            price: +price
        });
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the item, maybe try creating it first? ${err}`);
    }
};
const routeP = (app) => {
    app.get('/products', index);
    app.get('products/show', show);
};
