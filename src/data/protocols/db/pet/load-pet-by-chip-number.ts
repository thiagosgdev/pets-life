import { PetModel } from "@/domain/models/pet";

export interface LoadPetByChipNumber {
    loadByChipNumber(chipNumber: string): Promise<PetModel>;
}
