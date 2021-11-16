export type AuthenticationParams = {
    email: string;
    password: string;
};

export interface Authentication {
    authenticate(data: AuthenticationParams): Promise<string>;
}
