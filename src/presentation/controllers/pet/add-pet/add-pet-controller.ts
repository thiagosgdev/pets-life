import { AddPet } from "@/domain/useCases/pet/add-pet";
import { Controller } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

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
