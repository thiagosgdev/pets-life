import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { AccountModel } from "@/domain/models/account";
import { DbAddAccount } from "@/domain/useCases/account/db-add-account";

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

describe("DbAddAccount", () => {
    test("Should call AddAccountRepository with correct data", async () => {
        class mockAddAccountRepository {
            async add(accountData: AddAccountParams): Promise<AccountModel> {
                return Promise.resolve(mockAccountModel());
            }
        }
        const addAccountRepositoryStub = new mockAddAccountRepository();
        const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
        const sut = new DbAddAccount(addAccountRepositoryStub);
        sut.add(mockAddAccountParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams());
    });
});
