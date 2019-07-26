"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Web token valido
 * [17/07/2019] / acuxin
**/
exports.checkJWT = (req, res, next) => {
    console.log('aasd', req);
    const token = req.headers.authorization;
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (error, decode) => {
        if (error) {
            return res.status(401).json({
                args: false,
                error
            });
        }
        next();
    });
};
/**
 * Valida token
 * [26/07/2019] / acuxin
**/
exports.validateToken = (token) => {
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET);
        return true;
    }
    catch (err) {
        return false;
    }
};
/**
 * Crea webtoken valido
 * [23/07/2019] / acuxin
**/
exports.getToken = (user) => jsonwebtoken_1.default.sign({
    user,
}, process.env.SECRET, { expiresIn: process.env.EXPIRATION_TOKEN });
//# sourceMappingURL=authentication.js.map