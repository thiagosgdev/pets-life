import { DbLoadPetByChip } from "@/data/useCases/pet/load-pet-by-chip/db-load-pet-by-chip";
import { LoadPetByChip } from "@/domain/useCases/pet/load-pet-by-chip";
import { PetPostgresRepository } from "@/infra/db/typeorm/pet/pet-postgres-repository";

export const makeDbLoadPetByChip = (): LoadPetByChip => {
    const petPostgresRepository = new PetPostgresRepository();
    return new DbLoadPetByChip(petPostgresRepository);
};
