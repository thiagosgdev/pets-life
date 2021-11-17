import { AddAccount } from "@/domain/useCases/account/add-account";
import { Authentication } from "@/domain/useCases/account/authenticaton";
import { badRequest } from "@/presentation/helpers/http/http-helper";
import { Controller } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";

export class SignUpController implements Controller {
    constructor(
        private readonly addAccount: AddAccount,
        private readonly validation: Validation,
        private readonly authentication: Authentication,
    ) {}
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request.body);
            if (error) {
                return badRequest(error);
            }
            const account = await this.addAccount.add(request.body);
            const { email, password } = request.body;
            if (account) {
                const accessToken = await this.authentication.authenticate({
                    email,
                    password,
                });
                if (accessToken) {
                    return {
                        status: 200,
                        body: accessToken,
                    };
                }
                return {
                    status: 401,
                    body: "Authentication error",
                };
            }
            return {
                status: 200,
                body: "Please try to recover your password",
            };
        } catch (error) {
            return {
                status: 500,
                body: error,
            };
        }
    }
}
