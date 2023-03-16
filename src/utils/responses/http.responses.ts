import { Response } from "express";

export enum HttpStatus {
  SUCCESS = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data: any) {
    res.status(HttpStatus.SUCCESS).json({
      status: HttpStatus.SUCCESS,
      statusMessage: "Success",
      data,
    });
  }

  NotFound(res: Response, data: any) {
    res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMessage: "not found",
      data,
    });
  }

  Unauthorized(res: Response, data: any) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMessage: "Unauthorized",
      data,
    });
  }

  Forbidden(res: Response, data: any) {
    res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMessage: "forbidden",
      data,
    });
  }

  Error(res: Response, data: any) {
    res.status(HttpStatus.ERROR).json({
      status: HttpStatus.ERROR,
      statusMessage: "Error",
      data,
    });
  }
}
