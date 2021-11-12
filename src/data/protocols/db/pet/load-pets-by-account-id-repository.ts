import { PetModel } from "@/domain/models/pet";

export interface LoadPetsByAccountIdRepository {
    load(account_id: string): Promise<PetModel[]>;
}
