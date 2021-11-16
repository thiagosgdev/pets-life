import { AddAccount } from "@/domain/useCases/account/add-account";
import { badRequest } from "@/presentation/helpers/http/http-helper";
import { Controller } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";

export class SignUpController implements Controller {
    constructor(
        private readonly addAccount: AddAccount,
        private readonly validation: Validation,
    ) {}
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request.body);
            if (error) {
                return badRequest(error);
            }
            const account = await this.addAccount.add(request.body);
            if (account) {
                return {
                    status: 200,
                    body: account,
                };
            }
            return {
                status: 403,
                body: "E-mail já utilizado",
            };
        } catch (error) {
            return {
                status: 500,
                body: error,
            };
        }
    }
}
