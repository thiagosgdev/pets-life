import { AddPetsRepository } from "@/data/protocols/db/pet/add-pets-repository";
import { PetModel } from "@/domain/models/pet";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";
import { DbAddPet } from "./db-add-pet";
import MockDate from "mockdate";
import { LoadPetByChipNumber } from "@/data/protocols/db/pet/load-pet-by-chip-number";

const mockPetModel = (): PetModel => ({
    id: "any_id",
    name: "any_name",
    birthdate: new Date(),
    gender: 1,
    chip_number: "any_chip_number",
    chip_website: "any_chip_website",
    breed: "any_breed",
    weigth: 1,
    accountt_id: "any_account_id",
    created_at: new Date(),
    updated_at: new Date(),
});

const mockAddPetParams = (): AddPetParams => ({
    name: "any_name",
    birthdate: new Date(),
    gender: 1,
    chip_number: "any_chip_number",
    chip_website: "any_chip_website",
    breed: "any_breed",
    weigth: 1,
    accountt_id: "any_account_id",
});

const mockLoadPetByChipNumber = (): LoadPetByChipNumber => {
    class LoadPetByChipNumberStub implements LoadPetByChipNumber {
        async loadByChipNumber(chipNumber: string): Promise<PetModel> {
            return Promise.resolve(null);
        }
    }
    return new LoadPetByChipNumberStub();
};

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
    loadPetByChipNumberStub: LoadPetByChipNumber;
};

const makeSut = (): SutTypes => {
    const addPetsRepositoryStub = mockAddPetsRepository();
    const loadPetByChipNumberStub = mockLoadPetByChipNumber();
    const sut = new DbAddPet(addPetsRepositoryStub, loadPetByChipNumberStub);
    return {
        addPetsRepositoryStub,
        sut,
        loadPetByChipNumberStub,
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
        await sut.add(mockAddPetParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddPetParams());
    });

    test("Should throw if AddPetsRepository throws", async () => {
        const { addPetsRepositoryStub, sut } = makeSut();
        jest.spyOn(addPetsRepositoryStub, "add").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.add(mockAddPetParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call LoadPetByChipNumber with correct value", async () => {
        const { sut, loadPetByChipNumberStub } = makeSut();
        const loadPetByChipNumberSpy = jest.spyOn(
            loadPetByChipNumberStub,
            "loadByChipNumber",
        );
        await sut.add(mockAddPetParams());
        expect(loadPetByChipNumberSpy).toHaveBeenCalledWith("any_chip_number");
    });

    test("Should return null if LoadPetByChipNumber returns a pet", async () => {
        const { sut, loadPetByChipNumberStub } = makeSut();
        jest.spyOn(
            loadPetByChipNumberStub,
            "loadByChipNumber",
        ).mockReturnValueOnce(Promise.resolve(mockPetModel()));
        const pet = await sut.add(mockAddPetParams());
        expect(pet).toBe(null);
    });

    test("Should throw if LoadPetByChipNumber throws", async () => {
        const { loadPetByChipNumberStub, sut } = makeSut();
        jest.spyOn(
            loadPetByChipNumberStub,
            "loadByChipNumber",
        ).mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.add(mockAddPetParams());
        await expect(promise).rejects.toThrow();
    });
});
