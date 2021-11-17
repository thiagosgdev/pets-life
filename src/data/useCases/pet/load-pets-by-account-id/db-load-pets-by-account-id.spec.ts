import { LoadPetsByAccountIdRepository } from "@/data/protocols/db/pet/load-pets-by-account-id-repository";
import { mockLoadPetsByAccountIdRepository } from "@/data/test";
import { DbLoadPetsByAccountId } from "./db-load-pets-by-account-id";

type SutTypes = {
    sut: DbLoadPetsByAccountId;
    loadPetsByAccountIdRepositoryStub: LoadPetsByAccountIdRepository;
};

const makeSut = (): SutTypes => {
    const loadPetsByAccountIdRepositoryStub =
        mockLoadPetsByAccountIdRepository();
    const sut = new DbLoadPetsByAccountId(loadPetsByAccountIdRepositoryStub);
    return {
        loadPetsByAccountIdRepositoryStub,
        sut,
    };
};

describe("DbLoadPetsByAccountId", () => {
    test("Should call LoadPetsByAccountIdRepository with correct value", async () => {
        const { sut, loadPetsByAccountIdRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(
            loadPetsByAccountIdRepositoryStub,
            "loadByAccountId",
        );
        await sut.loadByAccountId("any_account_id");
        expect(loadSpy).toHaveBeenCalledWith("any_account_id");
    });

    test("Should return the list of pets from the account", async () => {
        const { sut } = makeSut();
        const pets = await sut.loadByAccountId("any_account_id");
        expect(pets).toBeTruthy();
        expect(pets[0].id).toBe("any_id");
        expect(pets[0].name).toBe("any_name");
        expect(pets[1].id).toBe("other_id");
    });

    test("Should throw if LoadPetsByAccountIdRepository throws", async () => {
        const { loadPetsByAccountIdRepositoryStub, sut } = makeSut();
        jest.spyOn(
            loadPetsByAccountIdRepositoryStub,
            "loadByAccountId",
        ).mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.loadByAccountId("any_account_id");
        await expect(promise).rejects.toThrow();
    });

    test("Should return null if LoadPetsByAccountIdRepository returns null", async () => {
        const { sut, loadPetsByAccountIdRepositoryStub } = makeSut();
        jest.spyOn(
            loadPetsByAccountIdRepositoryStub,
            "loadByAccountId",
        ).mockReturnValueOnce(Promise.resolve(null));
        const pets = await sut.loadByAccountId("any_account_id");
        expect(pets).toBeNull();
    });
});
