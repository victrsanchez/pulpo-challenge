import Express from "express";
import { AppController } from "./controllers/app.controller";

/**
 * En este método asincrono inicializa la aplicación express con una sola ruta GET /aid-data
 */
const main = async () => {
  const appController = new AppController();
  const app = Express();

  app.use(Express.json());
  app.get("/aid-data", (res, req) => appController.getAidData(res, req));

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

main();
