import { LoadAccountByEmailRepository } from "@/data/protocols/db/account";
import { mockLoadAccountByEmailRepository } from "@/data/test";
import { DbLoadAccountByEmail } from "./db-load-account-by-email";

type SutTypes = {
    sut: DbLoadAccountByEmail;
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
    const sut = new DbLoadAccountByEmail(loadAccountByEmailRepositoryStub);
    return {
        sut,
        loadAccountByEmailRepositoryStub,
    };
};

describe("Db Load Account By Email", () => {
    test("Should call LoadAccountByEmailRepository with the correct values", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load");
        await sut.load("any_email@mail.com");
        expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
    });

    test("Should return the account on LoadAccountByEmailRepository success", async () => {
        const { sut } = makeSut();
        const account = await sut.load("any_email@mail.com");
        expect(account).toHaveProperty("id");
    });

    test("Should return return null on LoadAccountByEmailRepository fail", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.resolve(null));
        const account = await sut.load("any_email@mail.com");
        expect(account).toBe(null);
    });

    test("Should return the account on LoadAccountByEmailRepository success", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.load("any_email@mail.com");
        await expect(promise).rejects.toThrow();
    });
});
