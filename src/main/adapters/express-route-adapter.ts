import { Request, Response } from "express";
import { Controller, HttpRequest } from "@/presentation/protocols";

export const adaptRoute = (controller: Controller) => {
    return async (request: Request, response: Response) => {
        const httpRequest: HttpRequest = {
            body: request.body,
            params: request.params,
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.status >= 200 || httpResponse.status <= 299) {
            response.status(httpResponse.status).json(httpResponse.body);
        } else {
            response
                .status(httpResponse.status)
                .json(httpResponse.body.message);
        }
    };
};
