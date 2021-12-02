import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddPetController } from "../factories/controllers/pet/add-pet.-controller-factory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeAddPetController()));
};
