import * as fs from "fs";
import request from "request";
import convert from "xml-js";

export class FileService {
  /**
   * Este método lee un archivo remoto dada la URL donde se encuentra este archivo
   * @param url : dirección donde se encuentra el archivo a leer
   * @returns regresa el contenido del archivo remoto o en dado caso que el archivo no se pueda leer regresa un error.
   */
  getFileFromUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (error, res, data) => {
        if (error) {
          reject(error);
        } else {
          const jsonData = JSON.parse(convert.xml2json(data));
          resolve(jsonData.elements[0]);
        }
      });
    });
  }

  /**
   *
   * @param data : contenido a almacenar dentro del archivo
   * @param name : nombre que se le asignara al archivo a crear
   * @returns notifica mediante un boleano si el archivo fue creado en caso contrario lanza un error que es cacheado y notificado al usuario
   */
  async storeFile(data: any, name: string): Promise<boolean> {
    try {
      fs.writeFileSync(`./${name}`, JSON.stringify(data));
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Dado el nombre de un archivo, este método verifica si un archivo existe o no
   * @param name : nombre del archivo
   * @returns Regrese un valor boleano notificando si un archivo existe o no
   */
  async fileExist(name: string): Promise<boolean> {
    try {
      return fs.openSync(`./${name}`, "r") ? true : false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Dado el nombre de un archivo, este método lee y regresa el contenido un archivo en formato JSON
   * @param fileName
   * @returns Objeto JSON con el contenido de un arhivo en caso que no se pueda leer el archivo se lanza un error notificando la causa
   */
  async readFile(fileName: string): Promise<any> {
    try {
      const data = fs.readFileSync(`./${fileName}`, "utf-8");
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
