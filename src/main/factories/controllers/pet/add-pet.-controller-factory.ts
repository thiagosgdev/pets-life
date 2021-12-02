import { makeDbAddAccount } from "@/main/factories/usecases/account/db-add-account-factory";
import { AddPetController } from "@/presentation/controllers/pet/add-pet/add-pet-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbAddPet } from "../../usecases/pet/add-pet/db-add-pet-factory";

export const makeAddPetController = (): Controller => {
    const controller = new AddPetController(makeDbAddPet());
    return controller;
};
