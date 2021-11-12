import { PetModel } from "@/domain/models/pet";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";

export interface AddPetsRepository {
    add(data: AddPetParams): Promise<PetModel>;
}
