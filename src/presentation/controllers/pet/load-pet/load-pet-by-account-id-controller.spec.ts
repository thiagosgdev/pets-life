import { mockAddPetParams, mockLoadPetsByAccountId } from "@/domain/test";
import { LoadPetsByAccountId } from "@/domain/useCases/pet";
import { load } from "dotenv";
import { LoadPetsByAccountIdController } from "./load-pet-by-account-id-controller";

type SutTypes = {
    sut: LoadPetsByAccountIdController;
    loadPetsByAccountIdStub: LoadPetsByAccountId;
};

const makeSut = (): SutTypes => {
    const loadPetsByAccountIdStub = mockLoadPetsByAccountId();
    const sut = new LoadPetsByAccountIdController(loadPetsByAccountIdStub);
    return {
        loadPetsByAccountIdStub,
        sut,
    };
};

describe("Load Pet By Account Id Controller", () => {
    test("Should call LoadPetByAccount with the correct values", async () => {
        const { sut, loadPetsByAccountIdStub } = makeSut();
        const loadSpy = jest.spyOn(loadPetsByAccountIdStub, "loadByAccountId");
        await sut.handle({ body: { account_id: "any_account_id" } });
        expect(loadSpy).toHaveBeenCalledWith("any_account_id");
    });
});
