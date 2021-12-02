import { AccountModel } from "@/domain/models/account";

export interface LoadAccountByEmail {
    load(email: string): Promise<AccountModel>;
}
