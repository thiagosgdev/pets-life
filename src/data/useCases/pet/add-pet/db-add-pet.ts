import {
    AddPetsRepository,
    LoadPetByChipRepository,
} from "@/data/protocols/db/pet";
import {} from "@/data/protocols/db/pet/load-pet-by-chip-repository";
import { PetModel } from "@/domain/models/pet";
import { AddPet, AddPetParams } from "@/domain/useCases/pet/add-pet";

export class DbAddPet implements AddPet {
    constructor(
        private readonly addPetsRepository: AddPetsRepository,
        private readonly loadPetByChipRepository: LoadPetByChipRepository,
    ) {}
    async add(petInfo: AddPetParams): Promise<PetModel> {
        const pet = await this.loadPetByChipRepository.load(
            petInfo.chip_number,
        );
        if (!pet) {
            const newPet = await this.addPetsRepository.add(petInfo);
            return newPet;
        }
        return null;
    }
}
