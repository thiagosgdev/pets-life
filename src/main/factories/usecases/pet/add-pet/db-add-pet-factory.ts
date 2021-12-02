import { DbAddAccount } from "@/data/useCases/account/add-account/db-add-account";
import { DbAddPet } from "@/data/useCases/pet/add-pet/db-add-pet";
import { AddPet } from "@/domain/useCases/pet";
import { PetPostgresRepository } from "@/infra/db/typeorm/pet/pet-postgres-repository";

export const makeDbAddPet = (): AddPet => {
    const petPostgresRepository = new PetPostgresRepository();
    return new DbAddPet(petPostgresRepository, petPostgresRepository);
};
