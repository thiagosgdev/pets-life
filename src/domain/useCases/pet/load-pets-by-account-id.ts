import { PetModel } from "@/domain/models/pet";

export interface LoadPetsByAccountId {
    loadByAccountId(account_id: string): Promise<PetModel[]>;
}
