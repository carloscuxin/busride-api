import Server from "./server/server";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./server/router";

const port: number = parseInt(process.env.PORT as string) || 9000;
const server = Server.init(port);
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use(cors());
server.app.use(router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});