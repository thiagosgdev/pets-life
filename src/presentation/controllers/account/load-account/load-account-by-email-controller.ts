import { LoadAccountByEmail } from "@/domain/useCases/account/load-account-by-email";
import {
    Controller,
    HttpRequest,
    HttpResponse,
} from "@/presentation/protocols";

export class LoadAccountByEmaiLController implements Controller {
    constructor(private readonly loadAccountByEmail: LoadAccountByEmail) {}
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { email } = request.body;
        const account = await this.loadAccountByEmail.load(email);
        if (account) {
            return {
                status: 200,
                body: account,
            };
        }
        return {
            status: 200,
            body: "Check the e-mail informed",
        };
    }
}
