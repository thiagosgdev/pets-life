import { PetModel } from "@/domain/models/pet";

export interface LoadPetsByAccountIdRepository {
    loadByAccountId(account_id: string): Promise<PetModel[]>;
}
