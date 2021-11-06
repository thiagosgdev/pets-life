import { PetModel } from "@/domain/models/pet";
import { Gender } from "@/domain/types/gender-enum";

export type AddPetParams = {
    name: string;
    birthdate: Date;
    gender: Gender;
    breed: string;
    weigth: number;
    accountt_id: string;
};

export interface AddPet {
    add(data: AddPetParams): Promise<PetModel>;
}
