"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
let { SALT_ROUNDS, PEPPER } = process.env;
dotenv_1.default.config();
class users {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM user';
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can not get list of users ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find users ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (firstName, lastName, id, password) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const hashsy = bcrypt_1.default.hashSync((u.password + PEPPER), +SALT_ROUNDS);
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                u.id,
                hashsy,
            ]);
            const item = result.rows[0];
            conn.release();
            return item;
        }
        catch (err) {
            throw new Error(`Could not add new ${u.firstName}. Error: ${err}`);
        }
    }
}
exports.users = users;
