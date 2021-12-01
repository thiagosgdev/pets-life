import { DbAuthentication } from "@/data/useCases/account/authentication/db-authentication";
import { Authentication } from "@/domain/useCases/account";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountPostgresRepository } from "@/infra/db/typeorm/account/account-postgres-repository";
import env from "@/main/config/env";

export const makeDbAuthentication = (): Authentication => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountPostgresRepository = new AccountPostgresRepository();
    return new DbAuthentication(
        accountPostgresRepository,
        bcryptAdapter,
        jwtAdapter,
        accountPostgresRepository,
    );
};
