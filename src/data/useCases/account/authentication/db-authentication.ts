import { Hasher } from "@/data/protocols/cryptography/Hasher";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-emailrepository";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/useCases/account/authenticaton";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly hasher: Hasher,
    ) {}

    async authenticate(data: AuthenticationParams): Promise<string> {
        const account = await this.loadAccountByEmail.loadByEmail(data.email);
        if (account) {
            return null;
        }
    }
}
