"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
//import { Messages } from '../config/languages/messages.MX';
const authentication_1 = require("../server/services/authentication");
//-- Controlador de la tabla vehicles --//
class LoginController {
    constructor() {
        this.model = "User";
        /**
         * Función que devuelve al usuario logueado
         * [26/06/2019] / acuxin
        **/
        this.findUser = (req, res) => {
            User_1.default.getUser().then(companies => {
                //if(companies.length === 0) { res.status(404).json({ args: true, message: Messages.generals.notFound }); }
                res.json(companies);
            }).catch(err => res.status(500).json(err));
        };
        /**
         * Función para iniciar sesión
         * [22/07/2019] / acuxin
        **/
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const request = {
                username: req.body.user,
                password: req.body.password
            };
            return yield User_1.default.login(request, req, res);
        });
        /**
         * Función para checar si esta autenticado y es valido el token
         * [27/07/2019] / acuxin
        **/
        this.isAuthenticated = (req, res) => {
            const token = req.headers.authorization;
            if (token === "undefined")
                return res.send(false);
            const isValidToken = authentication_1.validateToken(token);
            if (isValidToken)
                return res.send(true);
        };
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map