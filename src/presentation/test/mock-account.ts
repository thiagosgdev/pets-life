import { AccountModel } from "@/domain/models/account";
import { mockAccountModel } from "@/domain/test";
import {
    AddAccount,
    AddAccountParams,
} from "@/domain/useCases/account/add-account";

export const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(data: AddAccountParams): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new AddAccountStub();
};
