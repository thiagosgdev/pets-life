import { AddPetParams } from "@/domain/useCases/pet/add-pet";
import { PetModel } from "@/domain/models/pet";
import { LoadPetsByAccountId } from "../useCases/pet";
import { LoadPetByChip } from "../useCases/pet/load-pet-by-chip";

export const mockAddPetParams = (): AddPetParams => ({
    name: "any_name",
    birthdate: new Date(),
    gender: "male",
    chip_number: "any_chip_number",
    chip_website: "any_chip_website",
    breed: "any_breed",
    weigth: 1,
    account_id: "",
});

export const mockPetModel = (): PetModel => ({
    id: "any_id",
    name: "any_name",
    birthdate: new Date(),
    gender: "male",
    chip_number: "any_chip_number",
    chip_website: "any_chip_website",
    breed: "any_breed",
    weigth: 1,
    account_id: "any_account_id",
    created_at: new Date(),
    updated_at: new Date(),
});

export const mockPetModels = (): PetModel[] => [
    {
        id: "any_id",
        name: "any_name",
        birthdate: new Date(),
        gender: "male",
        chip_number: "any_chip_number",
        chip_website: "any_chip_website",
        breed: "any_breed",
        weigth: 1,
        account_id: "any_account_id",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "other_id",
        name: "other_name",
        birthdate: new Date(),
        gender: "female",
        chip_number: "other_chip_number",
        chip_website: "other_chip_website",
        breed: "other_breed",
        weigth: 1,
        account_id: "any_account_id",
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export const mockLoadPetsByAccountId = (): LoadPetsByAccountId => {
    class LoadPetsByAccountIdStub implements LoadPetsByAccountId {
        loadByAccountId(account_id: string): Promise<PetModel[]> {
            return Promise.resolve(mockPetModels());
        }
    }
    return new LoadPetsByAccountIdStub();
};

export const mockLoadPetByChip = (): LoadPetByChip => {
    class LoadPetByChipStub implements LoadPetByChip {
        async load(chip_number): Promise<PetModel> {
            return Promise.resolve(mockPetModel());
        }
    }
    return new LoadPetByChipStub();
};
