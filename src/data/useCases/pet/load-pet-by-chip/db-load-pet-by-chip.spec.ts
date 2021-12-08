import { LoadPetByChipRepository } from "@/data/protocols/db/pet";
import { mockLoadPetByChipRepository } from "@/data/test";
import { DbLoadPetByChip } from "./db-load-pet-by-chip";

type SutTypes = {
    sut: DbLoadPetByChip;
    loadPetByChipRepositoryStub: LoadPetByChipRepository;
};

const makeSut = (): SutTypes => {
    const loadPetByChipRepositoryStub = mockLoadPetByChipRepository();
    const sut = new DbLoadPetByChip(loadPetByChipRepositoryStub);
    return {
        loadPetByChipRepositoryStub,
        sut,
    };
};

describe("Db Load Pet By Chip", () => {
    test("Should call LoadPetByChipRepository with the correct values", async () => {
        const { sut, loadPetByChipRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadPetByChipRepositoryStub, "load");
        await sut.load("any_chip_number");
        expect(loadSpy).toHaveBeenCalledWith("any_chip_number");
    });

    test("Should return the pet on LoadPetByChipRepository success", async () => {
        const { sut } = makeSut();
        const pet = await sut.load("any_chip_number");
        expect(pet).toHaveProperty("id");
    });

    test("Should return null on LoadPetByChipRepository fail", async () => {
        const { sut, loadPetByChipRepositoryStub } = makeSut();
        jest.spyOn(loadPetByChipRepositoryStub, "load").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const pet = await sut.load("any_chip_number");
        expect(pet).toBe(null);
    });

    test("Should throw if LoadPetByChipRepository throws", async () => {
        const { sut, loadPetByChipRepositoryStub } = makeSut();
        jest.spyOn(loadPetByChipRepositoryStub, "load").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.load("any_chip_number");
        await expect(promise).rejects.toThrow();
    });
});
