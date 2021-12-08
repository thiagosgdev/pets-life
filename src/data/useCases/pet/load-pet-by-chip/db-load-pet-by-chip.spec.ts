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
});
