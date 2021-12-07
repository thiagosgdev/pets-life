import { DbLoadPetsByAccountId } from "@/data/useCases/pet/load-pets-by-account-id/db-load-pets-by-account-id";
import { LoadPetsByAccountId } from "@/domain/useCases/pet";
import { PetPostgresRepository } from "@/infra/db/typeorm/pet/pet-postgres-repository";

export const makeDbLoadPetsByAccountId = (): LoadPetsByAccountId => {
    const petPostgresRepository = new PetPostgresRepository();
    return new DbLoadPetsByAccountId(petPostgresRepository);
};
