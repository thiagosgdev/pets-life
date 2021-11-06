import { AddPetsRepository } from "@/data/protocols/db/pet/add-pets-repository";
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

const mockAddPetsRepository = (): AddPetsRepository => {
    class AddPetsRepositoryStub implements AddPetsRepository {
        async add(data: AddPetParams): Promise<PetModel> {
            return Promise.resolve(mockPetModel());
        }
    }
    return new AddPetsRepositoryStub();
};

type SutTypes = {
    sut: DbAddPet;
    addPetsRepositoryStub: AddPetsRepository;
};
const makeSut = (): SutTypes => {
    const addPetsRepositoryStub = mockAddPetsRepository();
    const sut = new DbAddPet(addPetsRepositoryStub);
    return {
        addPetsRepositoryStub,
        sut,
    };
};

describe("DBAddPet", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should ensure that DbAddPet calls AddPetsReposioty with correct values", async () => {
        const { sut, addPetsRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addPetsRepositoryStub, "add");
        await sut.add(mockPetParams());
        expect(addSpy).toHaveBeenCalledWith(mockPetParams());
    });
});
