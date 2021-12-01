import { Validation } from "@/presentation/protocols";
import { RequiredFieldValidation } from "@/validation/require-field-validation";
import { ValidationComposite } from "@/validation/validation-composite";

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    for (const field of [
        "name",
        "last_name",
        "cellphone",
        "zip_code",
        "email",
        "password",
    ]) {
        validations.push(new RequiredFieldValidation(field));
    }
    return new ValidationComposite(validations);
};
