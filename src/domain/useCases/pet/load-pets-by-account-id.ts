import { PetModel } from "@/domain/models/pet";

export interface LoadPetsByAccountId {
    load(account_id: string): Promise<PetModel[]>;
}
