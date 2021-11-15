import { AddAccount } from "@/domain/useCases/account/add-account";
import { Controller } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class SignUpController implements Controller {
    constructor(private readonly addAccount: AddAccount) {}
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
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
