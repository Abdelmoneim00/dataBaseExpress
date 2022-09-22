"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middlewares/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("./../models/users");
const express_1 = __importDefault(require("express"));
const user = new users_1.users();
const userRoute = express_1.default.Router();
const index = async (_req, res) => {
    const returnP = await user.index();
    res.json(returnP);
};
const show = async (req, res) => {
    let id = req.params.id;
    try {
        const returnP = await user.show(+id);
        res.json(returnP);
    }
    catch (err) {
        throw new Error(`can not get the user, maybe try creating it first? ${err}`);
    }
};
const create = async (req, res) => {
    let name = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;
    let Id = req.body.id;
    const newUser = {
        id: +Id,
        firstName: name,
        lastName: lastName,
        password: password,
    };
    try {
        const returnP = await user.create(newUser);
        const token = jsonwebtoken_1.default.sign({ newUser: returnP }, process.env.ACCESS_TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        throw new Error(`can not create the user, an internal error occured? ${err}`);
    }
};
userRoute.get('/', auth_1.authenticateToken, index);
userRoute.get('/show', auth_1.authenticateToken, show);
userRoute.post('/create', create);
exports.default = userRoute;
