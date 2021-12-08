import { LoadPetByChipRepository } from "@/data/protocols/db/pet";
import { PetModel } from "@/domain/models/pet";

export class DbLoadPetByChip implements LoadPetByChipRepository {
    constructor(
        private readonly loadPetByChipRepository: LoadPetByChipRepository,
    ) {}

    async load(chip_number: string): Promise<PetModel> {
        const pet = await this.loadPetByChipRepository.load(chip_number);
        return pet;
    }
}
