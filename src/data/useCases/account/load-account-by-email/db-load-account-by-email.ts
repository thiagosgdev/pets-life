import { LoadAccountByEmailRepository } from "@/data/protocols/db/account";
import { AccountModel } from "@/domain/models/account";
import { LoadAccountByEmail } from "@/domain/useCases/account/load-account-by-email";

export class DbLoadAccountByEmail implements LoadAccountByEmail {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    ) {}

    async load(email: string): Promise<AccountModel> {
        const account = await this.loadAccountByEmailRepository.load(email);
        return account;
    }
}
