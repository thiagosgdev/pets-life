import { Encrypter } from "@/data/protocols/cryptography/Encrypter";
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
        private readonly encrypter: Encrypter,
    ) {}

    async authenticate(data: AuthenticationParams): Promise<string> {
        const account = await this.loadAccountByEmail.loadByEmail(data.email);
        if (account) {
            const isValid = await this.hashComparer.compare(
                data.password,
                account.password,
            );
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(account.id);
            }
        }

        return null;
    }
}
