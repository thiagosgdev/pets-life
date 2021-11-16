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
        await this.loadAccountByEmail.loadByEmail(data.email);
        return null;
    }
}
