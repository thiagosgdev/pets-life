import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { AccountModel } from "@/domain/models/account";
import { LoadAccountByEmail } from "../useCases/account/load-account-by-email";

export const mockAddAccountParams = (): AddAccountParams => ({
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
});

export const mockAccountModel = (): AccountModel => ({
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

export const mockLoadAccountByEmail = (): LoadAccountByEmail => {
    class LoadAccountByEmailStub implements LoadAccountByEmail {
        async load(email: string): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new LoadAccountByEmailStub();
};
