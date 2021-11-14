import { LoadPetByChipNumberRepository } from "@/data/protocols/db/pet/load-pet-by-chip-number-repository";
import { Pet } from "@/domain/entities/Pet";
import { PetModel } from "@/domain/models/pet";
import { AddPet, AddPetParams } from "@/domain/useCases/pet/add-pet";
import { LoadPetsByAccountId } from "@/domain/useCases/pet/load-pets-by-account-id";
import { getRepository, Repository } from "typeorm";

export class PetPostgresRepository
    implements AddPet, LoadPetsByAccountId, LoadPetByChipNumberRepository
{
    private repository: Repository<Pet>;

    constructor() {
        this.repository = getRepository(Pet);
    }
    async add(pet_data: AddPetParams): Promise<PetModel> {
        const pet = this.repository.create(pet_data);
        await this.repository.save(pet);
        return pet;
    }

    async loadByAccountId(account_id: string): Promise<PetModel[]> {
        const pets = await this.repository.find({ account_id });
        if (pets.length > 0) {
            return pets;
        }
        return null;
    }

    async loadByChipNumber(chip_number: string): Promise<PetModel> {
        const pet = await this.repository.findOne({ chip_number });
        if (pet) {
            return pet;
        }
        return null;
    }
}
