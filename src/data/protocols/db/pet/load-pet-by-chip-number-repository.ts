import { PetModel } from "@/domain/models/pet";

export interface LoadPetByChipNumberRepository {
    loadByChipNumber(chipNumber: string): Promise<PetModel>;
}
