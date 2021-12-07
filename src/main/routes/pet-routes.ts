import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddPetController } from "../factories/controllers/pet/add-pet.-controller-factory";
import { makeLoadPetsByAccountIdController } from "../factories/controllers/pet/load-pets-account-controller-factory";

export default (router: Router): void => {
    router.post("/pets", adaptRoute(makeAddPetController()));
    router.get(
        "/pets/:account_id",
        adaptRoute(makeLoadPetsByAccountIdController()),
    );
};
