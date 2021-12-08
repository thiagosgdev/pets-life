export type PetModel = {
    id: string;
    name: string;
    birthdate: Date;
    chip_number: string;
    chip_website: string;
    gender: "female" | "male";
    breed: string;
    weigth: number;
    account_id: string;
    created_at: Date;
    updated_at: Date;
};
