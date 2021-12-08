import { PetModel } from "@/domain/models/pet";

export interface LoadPetByChip {
    load(chip_number: string): Promise<PetModel>;
}
