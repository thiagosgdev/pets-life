import { DbAddAccount } from "@/data/useCases/account/add-account/db-add-account";
import { AddAccount } from "@/domain/useCases/account";
import { AccountPostgresRepository } from "@/infra/db/typeorm/account/account-postgres-repository";

export const makeDbSignUp = (): AddAccount => {
    const accountPostgresRepository = new AccountPostgresRepository();
    return new DbAddAccount(
        accountPostgresRepository,
        null,
        accountPostgresRepository,
    );
};
