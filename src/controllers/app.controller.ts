import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { HttpResponse } from "../utils/responses/http.responses";
import { AppService } from "../services/app.service";

export class AppController {
  constructor(
    private readonly appService: AppService = new AppService(),
    private readonly httpResponses: HttpResponse = new HttpResponse()
  ) {}
/**
 * Este método es la entrada de la ruta GET /aid-data donde valida, sanitiza los valores de entrada y responde con un arreglo de objetos
 * @param req 
 * @param res 
 * @return {[]} responde un arreglo de objetos  que muestran la ayuda monetaría de un pais especifico
 */
  async getAidData(req: Request, res: Response) {
    try {
      await check("countryCode")
        .isLength({ min: 2, max: 2 })
        .isString()
        .trim()
        .escape()
        .run(req);

      const result = validationResult(req);

      if (result.isEmpty()) {
        const { countryCode } = req.body;
        const response = await this.appService.getDataOpenAid(countryCode.toUpperCase());
        this.httpResponses.Ok(res, response);
      } else {
        this.httpResponses.Error(res, result);
      }
    } catch (error) {
      this.httpResponses.Error(res, error.message);
    }
  }
}
