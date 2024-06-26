import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import {
  ID_TOKEN_COOKIE_KEY,
  TOKEN_COOKIE_KEY,
} from "src/core/constant/auth.constant";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();

    const type = host.getType();
    if (type === "http") {
      switch (status) {
        case 401:
          response.clearCookie(TOKEN_COOKIE_KEY);
          response.clearCookie(ID_TOKEN_COOKIE_KEY);
          response.redirect("/admin/auth");
          break;
        case 404:
          response.redirect("/admin/not-found");
          break;
        case 403:
          response.redirect("/admin/forbidden");
          break;
        default:
          response.status(400).send(exceptionResponse);
          break;
      }
    }
  }
}
