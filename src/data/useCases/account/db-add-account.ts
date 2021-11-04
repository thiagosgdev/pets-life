import { Hasher } from "@/data/protocols/cryptography/Hasher";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { AccountModel } from "@/domain/models/account";
import {
    AddAccount,
    AddAccountParams,
} from "@/domain/useCases/account/add-account";

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly addAccountRepository: AddAccountRepository,
        private readonly hasher: Hasher,
    ) {}

    async add(accountData: AddAccountParams): Promise<AccountModel> {
        const hashedPassword = await this.hasher.hash(accountData.password);
        const account = await this.addAccountRepository.add(
            Object.assign({}, accountData, { password: hashedPassword }),
        );
        return account;
    }
}
