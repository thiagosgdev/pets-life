import { Encrypter, HashComparer } from "@/data/protocols/cryptography";
import {
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
} from "@/data/protocols/db/account";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/useCases/account/authenticaton";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
        private readonly updateAccessToken: UpdateAccessTokenRepository,
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
                await this.updateAccessToken.updateToken(
                    accessToken,
                    account.id,
                );
                return accessToken;
            }
        }
        return null;
    }
}
