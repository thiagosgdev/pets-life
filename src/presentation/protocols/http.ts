export type HttpRequest = {
    body?: any;
    headers?: any;
    params?: any;
    account_id?: string;
};

export type HttpResponse = {
    status: number;
    body: any;
};
