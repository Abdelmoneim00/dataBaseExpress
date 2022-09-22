"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
async function authenticatePass(firstName, password) {
    const conn = await database_1.default.connect();
    const sql = 'SELECT password FROM users WHERE firstname=($1)';
    const result = await conn.query(sql, [firstName]);
    console.log(password + process.env.PEPPER);
    if (result.rows.length) {
        const user = result.rows[0];
        console.log(user);
        if (bcrypt_1.default.compareSync(password + process.env.PEPPER, user.password)) {
            return user;
        }
        else {
            throw new Error('wrong firstname or password');
        }
    }
    return null;
}
exports.default = authenticatePass;
