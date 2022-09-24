"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../models/orders");
const auth_1 = require("../middlewares/auth");
const order = new orders_1.orders();
const orderRoute = express_1.default.Router();
const showOrder = async (req, res) => {
    let id = req.body.id;
    const returnP = await order.showOrder(id);
    res.json(returnP);
};
const create = async (req, res) => {
    let userId = +req.body.user_id;
    let status = req.body.status;
    let Id = req.body.id;
    let order_product_id = req.body.order_product_id;
    try {
        const returnP = await order.createOrder({
            user_id: +userId,
            status: status,
            id: Id,
            order_product_id: order_product_id
        });
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the item, maybe try creating user first? ${err}`);
    }
};
const addNewOrder = async (req, res) => {
    let id = req.body.id;
    let product_id = req.body.product_id;
    let order_id = req.body.order_id;
    let quantity = req.body.quantity;
    try {
        const returnO = await order.addOrder({ id, order_id, product_id, quantity });
        console.log(returnO);
        res.json(returnO);
    }
    catch (err) {
        res.send(err);
    }
};
orderRoute.get('/show', auth_1.authenticateToken, showOrder);
orderRoute.post('/create', auth_1.authenticateToken, create);
orderRoute.post('/addOrder', auth_1.authenticateToken, addNewOrder);
exports.default = orderRoute;
