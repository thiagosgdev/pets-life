import { AddPetsRepository } from "@/data/protocols/db/pet/add-pets-repository";
import { LoadPetByChipNumberRepository } from "@/data/protocols/db/pet/load-pet-by-chip-number-repository";
import { PetModel } from "@/domain/models/pet";
import { AddPet, AddPetParams } from "@/domain/useCases/pet/add-pet";

export class DbAddPet implements AddPet {
    constructor(
        private readonly addPetsRepository: AddPetsRepository,
        private readonly loadPetByChipNumberRepository: LoadPetByChipNumberRepository,
    ) {}
    async add(petInfo: AddPetParams): Promise<PetModel> {
        const pet = await this.loadPetByChipNumberRepository.loadByChipNumber(
            petInfo.chip_number,
        );
        if (!pet) {
            const newPet = await this.addPetsRepository.add(petInfo);
            return newPet;
        }
        return null;
    }
}