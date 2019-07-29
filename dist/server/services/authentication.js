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
    const token = exports.revertToken(req.headers.authorization);
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
        jsonwebtoken_1.default.verify(exports.revertToken(token), process.env.SECRET);
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
exports.getToken = (user) => {
    const token = jsonwebtoken_1.default.sign({
        user: {
            username: user.username
        },
    }, process.env.SECRET, { expiresIn: process.env.EXPIRATION_TOKEN });
    return exports.transformToken(token);
};
/**
 * Transforma y revierte los token
 * [27/07/2019] / acuxin
**/
exports.transformToken = (token) => token.split('.').join('=');
exports.revertToken = (token) => token.split('=').join('.');
//# sourceMappingURL=authentication.js.map