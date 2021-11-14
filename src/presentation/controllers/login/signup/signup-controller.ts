import { AddAccount } from "@/domain/useCases/account/add-account";
import { Controller } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class SignUpController implements Controller {
    constructor(private readonly addAccount: AddAccount) {}
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const account = await this.addAccount.add(request.body);
        return null;
    }
}
