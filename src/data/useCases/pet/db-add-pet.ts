import { AddPetsRepository } from "@/data/protocols/db/pet/add-pets-repository";
import { LoadPetByChipNumber } from "@/data/protocols/db/pet/load-pet-by-chip-number";
import { PetModel } from "@/domain/models/pet";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";

export class DbAddPet implements AddPetsRepository {
    constructor(
        private readonly addPetsRepository: AddPetsRepository,
        private readonly loadPetByChipNumber: LoadPetByChipNumber,
    ) {}
    async add(petInfo: AddPetParams): Promise<PetModel> {
        await this.loadPetByChipNumber.loadByChipNumber(petInfo.chip_number);
        const newPet = await this.addPetsRepository.add(petInfo);
        return newPet;
    }
}
