import { mockLoadPetByChip } from "@/domain/test";
import { LoadPetByChip } from "@/domain/useCases/pet/load-pet-by-chip";
import { HttpRequest } from "@/presentation/protocols";
import { LoadPetByChipController } from "./load-pet-by-chip-controller";

const makeFakeRequest = (): HttpRequest => ({
    body: {
        chip_number: "any_chip_number",
    },
});

type SutTypes = {
    sut: LoadPetByChipController;
    loadPetByChipStub: LoadPetByChip;
};

const makeSut = (): SutTypes => {
    const loadPetByChipStub = mockLoadPetByChip();
    const sut = new LoadPetByChipController(loadPetByChipStub);
    return {
        loadPetByChipStub,
        sut,
    };
};

describe("Load Pet By Chip Controller", () => {
    test("Should call LoadPetByChip with the correct values", async () => {
        const { sut, loadPetByChipStub } = makeSut();
        const loadSpy = jest.spyOn(loadPetByChipStub, "load");
        await sut.handle(makeFakeRequest());
        expect(loadSpy).toHaveBeenCalledWith("any_chip_number");
    });

    test("Should return 200 on LoadPetByChip success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
    });

    test("Should return 200 on LoadPetByChip fail", async () => {
        const { sut, loadPetByChipStub } = makeSut();
        jest.spyOn(loadPetByChipStub, "load").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
        expect(response.body.message).toBeTruthy();
    });
});
