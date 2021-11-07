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
    accountt_id: string;
    created_at: Date;
    updated_at: Date;
};
