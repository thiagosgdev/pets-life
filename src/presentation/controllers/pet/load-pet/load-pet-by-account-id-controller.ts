import { LoadPetsByAccountId } from "@/domain/useCases/pet";
import {
    Controller,
    HttpRequest,
    HttpResponse,
} from "@/presentation/protocols";

export class LoadPetsByAccountIdController implements Controller {
    constructor(private readonly loadPetsByAccountId: LoadPetsByAccountId) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { account_id } = request.body;
            const pets = await this.loadPetsByAccountId.loadByAccountId(
                account_id,
            );
            if (pets) {
                return {
                    status: 200,
                    body: pets,
                };
            }
            return {
                status: 200,
                body: {
                    message: "Check the id account",
                },
            };
        } catch (error) {
            return {
                status: 500,
                body: {
                    message: "Internal Server error",
                },
            };
        }
    }
}
