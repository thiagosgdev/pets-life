import { AddPetRepository } from "@/data/protocols/db/pet/add-pet-repository";
import { PetModel } from "@/domain/models/pet";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";

export class DbAddPet implements AddPetRepository {
    constructor(private readonly addPetRepository: AddPetRepository) {}
    async add(petInfo: AddPetParams): Promise<PetModel> {
        const pet = await this.addPetRepository.add(petInfo);
        return pet;
    }
}
