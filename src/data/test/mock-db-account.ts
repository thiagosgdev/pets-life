import { AccountModel } from "@/domain/models/account";
import { mockAccountModel } from "@/domain/test";
import { AddAccountParams } from "@/domain/useCases/account/add-account";
import {
    UpdateAccessTokenRepository,
    LoadAccountByEmailRepository,
    AddAccountRepository,
} from "@/data/protocols/db/account";

export const mockAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub {
        async add(accountData: AddAccountParams): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository =
    (): LoadAccountByEmailRepository => {
        class LoadAccountByEmailRepositoryStub
            implements LoadAccountByEmailRepository
        {
            async loadByEmail(email: string): Promise<AccountModel> {
                return Promise.resolve(null);
            }
        }
        return new LoadAccountByEmailRepositoryStub();
    };

export const mockUpdateAccessToken = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenStub implements UpdateAccessTokenRepository {
        async updateToken(token: string, id: string): Promise<void> {}
    }
    return new UpdateAccessTokenStub();
};
