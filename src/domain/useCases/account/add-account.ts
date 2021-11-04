import { AccountModel } from "@/domain/models/account";

export type AddAccountParams = {
    name: string;
    lastName: string;
    cellphone: string;
    zipCode: string;
    email: string;
    password: string;
};

export interface AddAccount {
    add(data: AddAccountParams): Promise<AccountModel>;
}
