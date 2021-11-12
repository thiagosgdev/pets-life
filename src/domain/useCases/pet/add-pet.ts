import { PetModel } from "@/domain/models/pet";
import { Gender } from "@/domain/types/gender-enum";

export type AddPetParams = {
    name: string;
    birthdate: Date;
    gender: Gender;
    chip_number?: string;
    chip_website?: string;
    breed: string;
    weigth: number;
    account_id: string;
};

export interface AddPet {
    add(pet_data: AddPetParams): Promise<PetModel>;
}
