import { HttpResponse } from "@/presentation/protocols/http";

export const serverError = (error: Error): HttpResponse => {
    return {
        status: 500,
        body: error,
    };
};

export const badRequest = (error: Error): HttpResponse => {
    return {
        status: 400,
        body: error,
    };
};

export const unauthorized = (error: Error): HttpResponse => {
    return {
        status: 401,
        body: error,
    };
};

export const forbidden = (error: Error): HttpResponse => {
    return {
        status: 403,
        body: error,
    };
};

export const notFound = (error: Error): HttpResponse => {
    return {
        status: 404,
        body: error,
    };
};

export const ok = (message: any): HttpResponse => {
    return {
        status: 200,
        body: message,
    };
};

export const created = (message: any): HttpResponse => {
    return {
        status: 201,
        body: message,
    };
};

export const noContent = (message: any): HttpResponse => {
    return {
        status: 204,
        body: message,
    };
};
