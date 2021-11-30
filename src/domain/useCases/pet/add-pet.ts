import { PetModel } from "@/domain/models/pet";

export type AddPetParams = {
    name: string;
    birthdate: Date;
    gender: "male" | "female";
    chip_number?: string;
    chip_website?: string;
    breed: string;
    weigth: number;
    account_id: string;
};

export interface AddPet {
    add(pet_data: AddPetParams): Promise<PetModel>;
}
