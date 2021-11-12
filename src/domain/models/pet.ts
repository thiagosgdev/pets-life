import { AccountPostgresRepository } from "@/infra/db/typeorm/account/account-postgres-repository";
import { Account } from "../entities/Account";
import { Gender } from "../types/gender-enum";

export type PetModel = {
    id: string;
    name: string;
    birthdate: Date;
    chip_number: string;
    chip_website: string;
    gender: Gender;
    breed: string;
    weigth: number;
    account_id: string;
    created_at: Date;
    updated_at: Date;
};
