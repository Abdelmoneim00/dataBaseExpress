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
    let userId = +req.body.userId;
    let status = req.body.status;
    let Id = +req.body.id;
    let quantity = +req.body.quantity;
    let productId = req.body.product_id;
    try {
        const returnP = await order.createOrder({
            user_id: userId,
            status: status,
            id: Id,
            quantity: [quantity],
            product_id: [productId],
        });
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the item, maybe try creating user first? ${err}`);
    }
};
orderRoute.get('/show', auth_1.authenticateToken, showOrder);
orderRoute.post('/create', auth_1.authenticateToken, create);
exports.default = orderRoute;
