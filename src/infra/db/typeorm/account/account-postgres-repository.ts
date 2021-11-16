import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-emailrepository";
import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/update-access-token-repository";
import { Account } from "@/domain/entities/Account";
import { AccountModel } from "@/domain/models/account";
import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { getRepository, Repository } from "typeorm";

export class AccountPostgresRepository
    implements
        AddAccountRepository,
        LoadAccountByEmailRepository,
        UpdateAccessTokenRepository
{
    private repository: Repository<Account>;
    constructor() {
        this.repository = getRepository(Account);
    }

    async add(data: AddAccountParams): Promise<AccountModel> {
        const account = this.repository.create(data);
        await this.repository.save(account);
        return account;
    }

    async loadByEmail(email: string): Promise<AccountModel> {
        const account = await this.repository.findOne({ email });
        if (account) {
            return account;
        }
        return null;
    }

    async updateToken(token: string, id: string): Promise<void> {
        await this.repository.update(id, { token });
    }
}
