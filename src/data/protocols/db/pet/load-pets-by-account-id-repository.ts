import { PetModel } from "@/domain/models/pet";

export interface LoadPetsByAccountIdRepository {
    load(accountId: string): Promise<PetModel[]>;
}
