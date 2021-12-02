import { Hasher } from "@/data/protocols/cryptography/Hasher";
import {
    AddAccountRepository,
    LoadAccountByEmailRepository,
} from "@/data/protocols/db/account";
import { AccountModel } from "@/domain/models/account";
import {
    AddAccount,
    AddAccountParams,
} from "@/domain/useCases/account/add-account";

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly addAccountRepository: AddAccountRepository,
        private readonly hasher: Hasher,
        private readonly loadAccountByEmaiLRepository: LoadAccountByEmailRepository,
    ) {}

    async add(accountData: AddAccountParams): Promise<AccountModel> {
        const account = await this.loadAccountByEmaiLRepository.load(
            accountData.email,
        );
        if (!account) {
            const hashedPassword = await this.hasher.hash(accountData.password);
            const newAccount = await this.addAccountRepository.add(
                Object.assign({}, accountData, { password: hashedPassword }),
            );
            return Promise.resolve(newAccount);
        }
        return null;
    }
}
