import { makeDbSignUp } from "@/main/factories/usecases/account/db-add-account-factory";
import { makeDbAuthentication } from "@/main/factories/usecases/authentication/db-authentication-factory";
import { SignUpController } from "@/presentation/controllers/login/signup/signup-controller";
import { Controller } from "@/presentation/protocols";
import { RequiredFieldValidation } from "@/validation/require-field-validation";
import { makeSignUpValidation } from "./validation-compositer-factoru";

export const makeSignUpController = (): Controller => {
    const controller = new SignUpController(
        makeDbSignUp(),
        makeSignUpValidation(),
        makeDbAuthentication(),
    );
    return controller;
};
