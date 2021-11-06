import { AddPetsRepository } from "@/data/protocols/db/pet/add-pets-repository";
import { PetModel } from "@/domain/models/pet";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";

export class DbAddPet implements AddPetsRepository {
    constructor(private readonly addPetsRepository: AddPetsRepository) {}
    async add(petInfo: AddPetParams): Promise<PetModel> {
        const pet = await this.addPetsRepository.add(petInfo);
        return pet;
    }
}
