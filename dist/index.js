"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./server/router"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = parseInt(process.env.PORT) || 9000;
const server = server_1.default.init(port);
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use(body_parser_1.default.json());
server.app.use(router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
//# sourceMappingURL=index.js.map