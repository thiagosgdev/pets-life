import { Pet } from "@/domain/entities/Pet";
import { PetModel } from "@/domain/models/pet";
import { AddPet, AddPetParams } from "@/domain/useCases/pet/add-pet";
import { LoadPetsByAccountId } from "@/domain/useCases/pet/load-pets-by-account-id";
import { getRepository, Repository } from "typeorm";

export class PetPostgresRepository implements AddPet, LoadPetsByAccountId {
    private repository: Repository<Pet>;

    constructor() {
        this.repository = getRepository(Pet);
    }
    async add(pet_data: AddPetParams): Promise<PetModel> {
        const pet = this.repository.create(pet_data);
        await this.repository.save(pet);
        return pet;
    }

    async load(account_id: string): Promise<PetModel[]> {
        return null;
    }
}
