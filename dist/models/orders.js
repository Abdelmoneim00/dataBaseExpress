"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const database_1 = __importDefault(require("../database"));
class orders {
    async showOrder(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT product_id,quantity from order_product where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`can not get information about order ${err}`);
        }
    }
    async showUserOrder(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id, status, quantity from orders where user_id=($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't get user orders ${err}`);
        }
    }
    async createOrder(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders(user_id,status,quantity,product_id) values ($1,$2,$3) returning *';
            const user_result = await conn.query(sql, [
                o.user_id,
                o.status,
                o.id,
                o.quantity,
                o.product_id,
            ]);
            conn.release();
            return user_result.rows[0];
        }
        catch (error) {
            throw new Error(`could not create new order ${error}`);
        }
    }
}
exports.orders = orders;
