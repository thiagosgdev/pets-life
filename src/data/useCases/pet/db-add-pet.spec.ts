import { AddPetRepository } from "@/data/protocols/db/pet/add-pet-repository";
import { PetModel } from "@/domain/models/pet";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";
import { DbAddPet } from "./db-add-pet";
import MockDate from "mockdate";

const mockPetModel = (): PetModel => ({
    id: "any_id",
    name: "any_name",
    birthdate: new Date(),
    gender: 1,
    breed: "any_breed",
    weigth: 1,
    accountt_id: "any_account_id",
    created_at: new Date(),
    updated_at: new Date(),
});

const mockPetParams = (): AddPetParams => ({
    name: "any_name",
    birthdate: new Date(),
    gender: 1,
    breed: "any_breed",
    weigth: 1,
    accountt_id: "any_account_id",
});

describe("DBAddPet", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should ensure that DbAddPet calls AddPetsReposioty with correct values", async () => {
        class AddPetRepositoryStub implements AddPetRepository {
            async add(data: AddPetParams): Promise<PetModel> {
                return Promise.resolve(mockPetModel());
            }
        }
        const addPetRepositoryStub = new AddPetRepositoryStub();
        const sut = new DbAddPet(addPetRepositoryStub);
        const addSpy = jest.spyOn(addPetRepositoryStub, "add");
        await sut.add(mockPetParams());
        expect(addSpy).toHaveBeenCalledWith(mockPetParams());
    });
});
