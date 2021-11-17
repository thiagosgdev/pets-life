import { AddPet } from "@/domain/useCases/pet/add-pet";
import {
    HttpRequest,
    HttpResponse,
    Controller,
} from "@/presentation/protocols";

export class AddPetController implements Controller {
    constructor(private readonly addPet: AddPet) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const {
            name,
            birthdate,
            gender,
            chip_number,
            chip_website,
            breed,
            weigth,
            account_id,
        } = request.body;
        const pet = await this.addPet.add({
            name,
            birthdate,
            gender,
            chip_number,
            chip_website,
            breed,
            weigth,
            account_id,
        });

        return null;
    }
}
