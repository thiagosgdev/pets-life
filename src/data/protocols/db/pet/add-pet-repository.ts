import { PetModel } from "@/domain/models/pet";
import { AddAccount } from "@/domain/useCases/account/add-account";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";

export interface AddPetRepository {
    add(data: AddPetParams): Promise<PetModel>;
}
