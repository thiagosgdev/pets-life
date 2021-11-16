import { HttpResponse } from "@/presentation/protocols/http";

export const badRequest = (error: Error): HttpResponse => {
    return {
        status: 400,
        body: error,
    };
};
