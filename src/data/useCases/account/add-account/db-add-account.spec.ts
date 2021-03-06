import { DbAddAccount } from "@/data/useCases/account/add-account/db-add-account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { Hasher } from "@/data/protocols/cryptography/Hasher";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository";
import {
    mockAddAccountRepository,
    mockHasher,
    mockLoadAccountByEmailRepository,
} from "@/data/test";
import { mockAccountModel, mockAddAccountParams } from "@/domain/test";

type SutTypes = {
    sut: DbAddAccount;
    addAccountRepositoryStub: AddAccountRepository;
    hasherStub: Hasher;
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
    const hasherStub = mockHasher();
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
    const addAccountRepositoryStub = mockAddAccountRepository();
    const sut = new DbAddAccount(
        addAccountRepositoryStub,
        hasherStub,
        loadAccountByEmailRepositoryStub,
    );
    return {
        addAccountRepositoryStub,
        sut,
        hasherStub,
        loadAccountByEmailRepositoryStub,
    };
};
describe("DbAddAccount", () => {
    test("Should call AddAccountRepository with correct data", async () => {
        const {
            loadAccountByEmailRepositoryStub,
            addAccountRepositoryStub,
            sut,
        } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.resolve(null));
        await sut.add(mockAddAccountParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams());
    });

    test("Should throw if AddAccountRepository throws", async () => {
        const {
            loadAccountByEmailRepositoryStub,
            addAccountRepositoryStub,
            sut,
        } = makeSut();
        jest.spyOn(addAccountRepositoryStub, "add").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.resolve(null));
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call Hasher with correct password", async () => {
        const { loadAccountByEmailRepositoryStub, sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, "hash");
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.resolve(null));
        await sut.add(mockAddAccountParams());
        expect(hashSpy).toHaveBeenCalledWith("any_password");
    });

    test("Should throw if Hasher throws", async () => {
        const { loadAccountByEmailRepositoryStub, hasherStub, sut } = makeSut();
        jest.spyOn(hasherStub, "hash").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.resolve(null));
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call LoadAccountByEmailRepository with correct email", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load");
        await sut.add(mockAddAccountParams());
        expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
    });

    test("Should return null if LoadAccountByEmailRepository returns an account", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "load",
        ).mockReturnValueOnce(Promise.resolve(mockAccountModel()));
        const account = await sut.add(mockAddAccountParams());
        expect(account).toBeNull();
    });
});
