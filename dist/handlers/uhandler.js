"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middlewares/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passCheck_1 = __importDefault(require("../middlewares/passCheck"));
const users_1 = require("./../models/users");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        id: Id,
        firstName: name,
        lastName: lastName,
        password: bcrypt_1.default.hashSync((password + process.env.PEPPER), +process.env.SALT_ROUNDS),
    };
    try {
        const Users = await user.create(newUser);
        const token = jsonwebtoken_1.default.sign({ user: Users }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token });
    }
    catch (err) {
        res.status(400);
        res.json({ message: `can not create new user ${err}` });
    }
};
const checkPass = async (req, res) => {
    let firstname = req.body.firstName;
    let password = req.body.password;
    try {
        const wait = await (0, passCheck_1.default)(firstname, password);
        if (wait) {
            res.status(200).json({ token: wait });
        }
        else {
            res.status(401).json({ message: 'unauthorized request!' });
        }
    }
    catch {
        res.json('something went wrong');
    }
};
userRoute.get('/', auth_1.authenticateToken, index);
userRoute.get('/show', auth_1.authenticateToken, show);
userRoute.post('/create', create);
userRoute.get('/login', checkPass);
exports.default = userRoute;
