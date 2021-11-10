import { AccountModel } from "@/domain/models/account";

export type AddAccountParams = {
    name: string;
    last_name: string;
    cellphone: string;
    zip_code: string;
    email: string;
    password: string;
};

export interface AddAccount {
    add(data: AddAccountParams): Promise<AccountModel>;
}
