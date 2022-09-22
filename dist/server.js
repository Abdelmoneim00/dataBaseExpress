"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const prohandler_1 = __importDefault(require("./handlers/prohandler"));
const cors_1 = __importDefault(require("cors"));
const uhandler_1 = __importDefault(require("./handlers/uhandler"));
const orderhanlder_1 = __importDefault(require("./handlers/orderhanlder"));
const app = (0, express_1.default)();
const address = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/products', prohandler_1.default);
app.use('/users', uhandler_1.default);
app.use('/orders', orderhanlder_1.default);
app.listen(address, () => {
    console.log(`app is working on localhost:${address}`);
});
exports.default = app;
