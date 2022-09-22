"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../models/products");
const auth_1 = require("../middlewares/auth");
const store = new products_1.Store();
const productRoute = express_1.default.Router();
const index = async (_req, res) => {
    const returnP = await store.index();
    res.json(returnP);
};
const show = async (req, res) => {
    let id = req.body.id;
    try {
        const returnP = await store.show(id);
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the item, maybe try creating it first? ${err}`);
    }
};
const create = async (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let Id = req.body.id;
    try {
        const returnP = await store.create({
            id: +Id,
            name: name,
            price: +price,
        });
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the item, maybe try creating user first? ${err}`);
    }
};
productRoute.get('/', index);
productRoute.get('/show', show);
productRoute.post('/create', auth_1.authenticateToken, create);
exports.default = productRoute;
