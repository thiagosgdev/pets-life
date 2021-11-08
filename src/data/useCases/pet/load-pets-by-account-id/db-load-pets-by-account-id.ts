import { LoadPetsByAccountIdRepository } from "@/data/protocols/db/pet/load-pets-by-account-id-repository";
import { PetModel } from "@/domain/models/pet";
import { LoadPetsByAccountId } from "@/domain/useCases/pet/load-pets-by-account-id";

export class DbLoadPetsByAccountId implements LoadPetsByAccountId {
    constructor(
        private readonly loadPetsByAccountIdRepository: LoadPetsByAccountIdRepository,
    ) {}
    async load(accountId: string): Promise<PetModel[]> {
        const pets = await this.loadPetsByAccountIdRepository.load(accountId);
        if (!pets) {
            return null;
        }
        return pets;
    }
}
