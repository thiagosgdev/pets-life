import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddAccountController } from "../factories/controllers/login/signup/add-account-controller-factory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeAddAccountController()));
};
