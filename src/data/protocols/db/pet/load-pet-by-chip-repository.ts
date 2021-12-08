import { PetModel } from "@/domain/models/pet";

export interface LoadPetByChipRepository {
    load(chip_number: string): Promise<PetModel>;
}
