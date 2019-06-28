//import mysql from "mysql";
/*
export default class MySQL {
  private static _instance: MySQL;

  connection: mysql.Connection;
  connected: Boolean = false;

  constructor() {
    console.log('Clase inicializada');
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'busride.user',
      password: '123456',
      database: 'busride'
    });

    this.connectDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

 /**
  * Ejecuta el Query enviado
  * [07/06/2019]
  * @param query 
  * @param callback 
 **/
/*  static executeQuery(query: string, callback: Function) {
    this.instance.connection.query(query, (err, res: Object[], fields) => {
      if(err) {
        console.log('Error en Query');
        console.log(err);
        return callback(err);
      }

      if(res.length === 0) {
        callback('El registro solicitado no existe');
      }else {
        callback(null, res);
      }
    });
  }

  /**
   * Conecta a la base de datos
   * [07/06/2019]
  **/
/*  private connectDB() {
    this.connection.connect((err: mysql.MysqlError) => {
      if(err) {
        console.log(err);
        return;
      }

      this.connected = true;
      console.log('Base de datos online!');
    });
  }
}*/