import { makeDbAddAccount } from "@/main/factories/usecases/account/db-add-account-factory";
import { makeDbAuthentication } from "@/main/factories/usecases/authentication/db-authentication-factory";
import { SignUpController } from "@/presentation/controllers/account/signup/signup-controller";
import { Controller } from "@/presentation/protocols";
import { makeSignUpValidation } from "./validation-compositer-factory";

export const makeAddAccountController = (): Controller => {
    const controller = new SignUpController(
        makeDbAddAccount(),
        makeSignUpValidation(),
        makeDbAuthentication(),
    );
    return controller;
};
