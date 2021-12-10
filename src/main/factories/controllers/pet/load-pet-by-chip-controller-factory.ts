import { LoadPetByChipController } from "@/presentation/controllers/pet/load-pet/load-pet-by-chip-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbLoadPetByChip } from "../../usecases/pet/load-pet/db-load-pet-by-chip-factory";

export const makeLoadPetByChipController = (): Controller => {
    const controller = new LoadPetByChipController(makeDbLoadPetByChip());
    return controller;
};
