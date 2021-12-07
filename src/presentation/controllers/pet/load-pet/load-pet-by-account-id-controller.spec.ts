import { mockAddPetParams, mockLoadPetsByAccountId } from "@/domain/test";
import { LoadPetsByAccountId } from "@/domain/useCases/pet";
import { HttpRequest } from "@/presentation/protocols";
import { LoadPetsByAccountIdController } from "./load-pet-by-account-id-controller";

const makeFakeRequest = (): HttpRequest => ({
    body: {
        account_id: "any_account_id",
    },
});

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
    test("Should call LoadPetByAccountId with the correct values", async () => {
        const { sut, loadPetsByAccountIdStub } = makeSut();
        const loadSpy = jest.spyOn(loadPetsByAccountIdStub, "loadByAccountId");
        await sut.handle(makeFakeRequest());
        expect(loadSpy).toHaveBeenCalledWith("any_account_id");
    });

    test("Should return 200 on LoadPetByAccountId success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
    });

    test("Should return 200 on LoadPetByAccountId fail", async () => {
        const { sut, loadPetsByAccountIdStub } = makeSut();
        jest.spyOn(
            loadPetsByAccountIdStub,
            "loadByAccountId",
        ).mockReturnValueOnce(Promise.resolve(null));
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
        expect(response.body.message).toBeTruthy();
    });
});
