import { LoadPetsByAccountIdController } from "@/presentation/controllers/pet/load-pet/load-pet-by-account-id-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbLoadPetsByAccountId } from "@/main/factories/usecases/pet/add-pet/db-load-pets-by-account-id-factory";

export const makeLoadPetsByAccountIdController = (): Controller => {
    const controller = new LoadPetsByAccountIdController(
        makeDbLoadPetsByAccountId(),
    );
    return controller;
};
