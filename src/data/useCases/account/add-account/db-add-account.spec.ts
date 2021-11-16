import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { AccountModel } from "@/domain/models/account";
import { DbAddAccount } from "@/data/useCases/account/add-account/db-add-account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { Hasher } from "@/data/protocols/cryptography/Hasher";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-emailrepository";

const mockAccountModel = (): AccountModel => ({
    id: "any_id",
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
    created_at: new Date(),
    updated_at: new Date(),
});

const mockAddAccountParams = (): AddAccountParams => ({
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
});

const mockAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub {
        async add(accountData: AddAccountParams): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new AddAccountRepositoryStub();
};

const mockHasher = (): Hasher => {
    class HasherStub {
        async hash(value: string): Promise<string> {
            return Promise.resolve("any_password");
        }
    }
    return new HasherStub();
};

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
        implements LoadAccountByEmailRepository
    {
        async loadByEmail(email: string): Promise<AccountModel> {
            return Promise.resolve(null);
        }
    }
    return new LoadAccountByEmailRepositoryStub();
};

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
        const { addAccountRepositoryStub, sut } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
        await sut.add(mockAddAccountParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams());
    });

    test("Should throw if AddAccountRepository throws", async () => {
        const { addAccountRepositoryStub, sut } = makeSut();
        jest.spyOn(addAccountRepositoryStub, "add").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call Hasher with correct password", async () => {
        const { sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, "hash");
        await sut.add(mockAddAccountParams());
        expect(hashSpy).toHaveBeenCalledWith("any_password");
    });

    test("Should throw if AddAccountRepository throws", async () => {
        const { hasherStub, sut } = makeSut();
        jest.spyOn(hasherStub, "hash").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call LoadAccountByEmailRepository with correct email", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadByEmailSpy = jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "loadByEmail",
        );
        await sut.add(mockAddAccountParams());
        expect(loadByEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
    });

    test("Should return null if LoadAccountByEmailRepository returns an account", async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            loadAccountByEmailRepositoryStub,
            "loadByEmail",
        ).mockReturnValueOnce(Promise.resolve(mockAccountModel()));
        const account = await sut.add(mockAddAccountParams());
        expect(account).toBeNull();
    });
});
