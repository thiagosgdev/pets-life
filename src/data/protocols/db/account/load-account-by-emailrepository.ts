import { Account } from "@/domain/entities/Account";
import { AccountModel } from "@/domain/models/account";

export interface LoadAccountByEmailRepository {
    loadByEmail(email: string): Promise<AccountModel>;
}
