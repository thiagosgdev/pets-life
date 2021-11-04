import { AddAccountRepository } from "@/data/protocols/account/add-account-repository";
import { AccountModel } from "@/domain/models/account";
import { AddAccount, AddAccountParams } from "./add-account";

export class DbAddAccount implements AddAccount {
    constructor(private readonly addAccountRepository: AddAccountRepository) {}

    async add(data: AddAccountParams): Promise<AccountModel> {
        const account = await this.addAccountRepository.add(data);
        return account;
    }
}
