import { PetModel } from "@/domain/models/pet";
import { mockPetModels, mockPetModel } from "@/domain/test";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";
import {
    AddPetsRepository,
    LoadPetsByAccountIdRepository,
    LoadPetByChipRepository,
} from "../protocols/db/pet";

export const mockLoadPetByChipRepository = (): LoadPetByChipRepository => {
    class LoadPetByChipRepositoryStub implements LoadPetByChipRepository {
        async load(chip_number: string): Promise<PetModel> {
            return Promise.resolve(mockPetModel());
        }
    }
    return new LoadPetByChipRepositoryStub();
};

export const mockAddPetsRepository = (): AddPetsRepository => {
    class AddPetsRepositoryStub implements AddPetsRepository {
        async add(data: AddPetParams): Promise<PetModel> {
            return Promise.resolve(mockPetModel());
        }
    }
    return new AddPetsRepositoryStub();
};

export const mockLoadPetsByAccountIdRepository =
    (): LoadPetsByAccountIdRepository => {
        class LoadPetsByAccountIdRepositoryStub
            implements LoadPetsByAccountIdRepository
        {
            async loadByAccountId(): Promise<PetModel[]> {
                return Promise.resolve(mockPetModels());
            }
        }
        return new LoadPetsByAccountIdRepositoryStub();
    };
