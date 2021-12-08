import { LoadPetByChip } from "@/domain/useCases/pet/load-pet-by-chip";
import {
    Controller,
    HttpRequest,
    HttpResponse,
} from "@/presentation/protocols";

export class LoadPetByChipController implements Controller {
    constructor(private readonly loadPetByChip: LoadPetByChip) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { chip_number } = request.body;
        const pet = await this.loadPetByChip.load(chip_number);
        if (pet) {
            return {
                status: 200,
                body: pet,
            };
        }
    }
}
