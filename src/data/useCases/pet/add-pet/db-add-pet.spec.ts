import {
    AddPetsRepository,
    LoadPetByChipRepository,
} from "@/data/protocols/db/pet";
import { DbAddPet } from "./db-add-pet";
import MockDate from "mockdate";
import {
    mockAddPetsRepository,
    mockLoadPetByChipRepository,
} from "@/data/test";
import { mockAddPetParams, mockPetModel } from "@/domain/test";
import { load } from "dotenv";

type SutTypes = {
    sut: DbAddPet;
    addPetsRepositoryStub: AddPetsRepository;
    loadPetByChipStub: LoadPetByChipRepository;
};

const makeSut = (): SutTypes => {
    const addPetsRepositoryStub = mockAddPetsRepository();
    const loadPetByChipStub = mockLoadPetByChipRepository();
    const sut = new DbAddPet(addPetsRepositoryStub, loadPetByChipStub);
    return {
        addPetsRepositoryStub,
        sut,
        loadPetByChipStub,
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
        const { sut, addPetsRepositoryStub, loadPetByChipStub } = makeSut();
        jest.spyOn(loadPetByChipStub, "load").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const addSpy = jest.spyOn(addPetsRepositoryStub, "add");
        await sut.add(mockAddPetParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddPetParams());
    });

    test("Should throw if AddPetsRepository throws", async () => {
        const { addPetsRepositoryStub, sut, loadPetByChipStub } = makeSut();
        jest.spyOn(loadPetByChipStub, "load").mockReturnValueOnce(
            Promise.resolve(null),
        );
        jest.spyOn(addPetsRepositoryStub, "add").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.add(mockAddPetParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call LoadPetByChipNumber with correct value", async () => {
        const { sut, loadPetByChipStub } = makeSut();
        const loadPetByChipNumberSpy = jest.spyOn(loadPetByChipStub, "load");
        await sut.add(mockAddPetParams());
        expect(loadPetByChipNumberSpy).toHaveBeenCalledWith("any_chip_number");
    });

    test("Should return null if LoadPetByChipNumber returns a pet", async () => {
        const { sut } = makeSut();
        const pet = await sut.add(mockAddPetParams());
        expect(pet).toBe(null);
    });

    test("Should throw if LoadPetByChipNumber throws", async () => {
        const { loadPetByChipStub, sut } = makeSut();
        jest.spyOn(loadPetByChipStub, "load").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.add(mockAddPetParams());
        await expect(promise).rejects.toThrow();
    });
});
