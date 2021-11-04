import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { AccountModel } from "@/domain/models/account";
import { DbAddAccount } from "@/data/useCases/account/db-add-account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { Hasher } from "@/data/protocols/cryptography/Hasher";

const mockAccountModel = (): AccountModel => ({
    id: "any_id",
    name: "any_name",
    lastName: "any_last_name",
    cellphone: "any_cellphone",
    zipCode: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
    created_at: new Date(),
    updated_at: new Date(),
});

const mockAddAccountParams = (): AddAccountParams => ({
    name: "any_name",
    lastName: "any_last_name",
    cellphone: "any_cellphone",
    zipCode: "any_zip_code",
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

type SutTypes = {
    sut: DbAddAccount;
    addAccountRepositoryStub: AddAccountRepository;
    hasherStub: Hasher;
};

const makeSut = (): SutTypes => {
    const hasherStub = mockHasher();
    const addAccountRepositoryStub = mockAddAccountRepository();
    const sut = new DbAddAccount(addAccountRepositoryStub, hasherStub);
    return {
        addAccountRepositoryStub,
        sut,
        hasherStub,
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

    test("Should call Hasher with correct value", async () => {
        const { sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, "hash");
        await sut.add(mockAddAccountParams());
        expect(hashSpy).toHaveBeenCalledWith("any_password");
    });
});
