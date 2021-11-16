import { HashComparer } from "@/data/protocols/cryptography/Hash-Comparer";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-emailrepository";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/useCases/account/authenticaton";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
    ) {}

    async authenticate(data: AuthenticationParams): Promise<string> {
        const account = await this.loadAccountByEmail.loadByEmail(data.email);
        if (account) {
            const isValid = await this.hashComparer.compare(
                data.password,
                account.password,
            );
        }

        return null;
    }
}
