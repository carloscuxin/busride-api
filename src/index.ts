import Server from "./server/server";
import router from "./server/router";
import bodyParser from "body-parser";

const port: number = parseInt(process.env.PORT as string) || 9000;
const server = Server.init(port);
server.app.use(bodyParser.urlencoded({extended: false}));
server.app.use(bodyParser.json());
server.app.use(router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});