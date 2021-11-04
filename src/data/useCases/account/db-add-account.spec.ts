import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { AccountModel } from "@/domain/models/account";
import { DbAddAccount } from "@/domain/useCases/account/db-add-account";
import { AddAccountRepository } from "@/data/protocols/account/add-account-repository";

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

type SutTypes = {
    sut: DbAddAccount;
    addAccountRepositoryStub: AddAccountRepository;
};

const makeSut = (): SutTypes => {
    const addAccountRepositoryStub = mockAddAccountRepository();
    const sut = new DbAddAccount(addAccountRepositoryStub);
    return {
        addAccountRepositoryStub,
        sut,
    };
};
describe("DbAddAccount", () => {
    test("Should call AddAccountRepository with correct data", async () => {
        const { addAccountRepositoryStub, sut } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
        sut.add(mockAddAccountParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams());
    });
});
