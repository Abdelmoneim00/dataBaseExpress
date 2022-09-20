"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const prohandler_1 = __importDefault(require("./handlers/prohandler"));
const app = (0, express_1.default)();
const address = 3000;
app.use(body_parser_1.default.json());
app.use(prohandler_1.default);
app.get;
app.listen(address, () => {
    console.log(`app is working on localhost:${address}`);
});
exports.default = app;
