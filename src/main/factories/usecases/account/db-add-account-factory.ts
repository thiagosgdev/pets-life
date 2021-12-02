import { DbAddAccount } from "@/data/useCases/account/add-account/db-add-account";
import { AddAccount } from "@/domain/useCases/account";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { AccountPostgresRepository } from "@/infra/db/typeorm/account/account-postgres-repository";

export const makeDbAddAccount = (): AddAccount => {
    const accountPostgresRepository = new AccountPostgresRepository();
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);

    return new DbAddAccount(
        accountPostgresRepository,
        bcryptAdapter,
        accountPostgresRepository,
    );
};
