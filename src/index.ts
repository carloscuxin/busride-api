import Server from "./server/server";
import router from "./server/router";
import bodyParser from "body-parser";

const server = Server.init(9000);
server.app.use(bodyParser.urlencoded({extended: false}));
server.app.use(bodyParser.json());
server.app.use(router);

server.start(() => {
  console.log('Servidor corriendo en el puerto 9000');
});