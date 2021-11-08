import { PetModel } from "@/domain/models/pet";

export interface LoadPetsByAccountId {
    load(accountId: string): Promise<PetModel[]>;
}
