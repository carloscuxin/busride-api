"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
/**
 * Web token valido
 * [17/07/2019] / acuxin
**/
const jwtCheck = express_jwt_1.default({
    secret: "NEMzQkU3RUVGQ0NCMEQwRDA4OEZDMTkyMTkxMjA0MDFCRTJEMDU2Mw",
    audience: 'http://busride',
    issuer: 'https://busride.auth0.com/',
    algorithms: ['RS256']
});
exports.default = jwtCheck;
//# sourceMappingURL=jwtCheck.js.map