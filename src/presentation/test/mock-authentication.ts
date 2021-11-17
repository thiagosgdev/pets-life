import {
    Authentication,
    AuthenticationParams,
} from "@/domain/useCases/account/authenticaton";

export const mockAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async authenticate(data: AuthenticationParams): Promise<string> {
            return Promise.resolve("any_token");
        }
    }
    return new AuthenticationStub();
};
