import {
    AddPetsRepository,
    LoadPetByChipNumberRepository,
} from "@/data/protocols/db/pet";
import { DbAddPet } from "./db-add-pet";
import MockDate from "mockdate";
import {
    mockAddPetsRepository,
    mockLoadPetByChipNumberRepository,
} from "@/data/test";
import { mockAddPetParams, mockPetModel } from "@/domain/test";

type SutTypes = {
    sut: DbAddPet;
    addPetsRepositoryStub: AddPetsRepository;
    loadPetByChipNumberStub: LoadPetByChipNumberRepository;
};

const makeSut = (): SutTypes => {
    const addPetsRepositoryStub = mockAddPetsRepository();
    const loadPetByChipNumberStub = mockLoadPetByChipNumberRepository();
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
