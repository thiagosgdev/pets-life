import { AddAccount, Authentication } from "@/domain/useCases/account";
import {
    badRequest,
    created,
    forbidden,
    ok,
    serverError,
} from "@/presentation/helpers/http/http-helper";
import {
    Validation,
    HttpRequest,
    HttpResponse,
    Controller,
} from "@/presentation/protocols";

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
                    return created(accessToken);
                }
                return forbidden({
                    name: "Authentication error",
                    message: "E-mail and/or password is incorrect",
                });
            }
            return ok("Please try to recover your password");
        } catch (error) {
            return serverError(error);
        }
    }
}
