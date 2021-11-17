import { AccountModel } from "@/domain/models/account";
import {
    AddAccount,
    AddAccountParams,
} from "@/domain/useCases/account/add-account";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/useCases/account/authenticaton";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { badRequest } from "@/presentation/helpers/http/http-helper";
import { HttpRequest } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";
import { SignUpController } from "./signup-controller";

const mockAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async authenticate(data: AuthenticationParams): Promise<string> {
            return Promise.resolve("any_token");
        }
    }
    return new AuthenticationStub();
};

const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(data: AddAccountParams): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new AddAccountStub();
};

const mockValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null;
        }
    }
    return new ValidationStub();
};
const mockAccountModel = (): AccountModel => ({
    id: "any_id",
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
    created_at: new Date(),
    updated_at: new Date(),
});

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: "any_name",
        last_name: "any_last_name",
        cellphone: "any_cellphone",
        zip_code: "any_zip_code",
        email: "any_email@mail.com",
        password: "any_password",
    },
});
type SutTypes = {
    sut: SignUpController;
    addAccountStub: AddAccount;
    validationStub: Validation;
    authenticationStub: Authentication;
};

const makeSut = (): SutTypes => {
    const addAccountStub = mockAddAccount();
    const validationStub = mockValidation();
    const authenticationStub = mockAuthentication();
    const sut = new SignUpController(
        addAccountStub,
        validationStub,
        authenticationStub,
    );
    return {
        sut,
        addAccountStub,
        validationStub,
        authenticationStub,
    };
};

describe("SignUp Controller", () => {
    describe("Add Account", () => {
        test("Should call AddAccount with the correct values", async () => {
            const { sut, addAccountStub } = makeSut();
            const addSpy = jest.spyOn(addAccountStub, "add");
            const httpRequest = makeFakeRequest();
            await sut.handle(httpRequest);
            expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
        });

        test("Should return status 200 on AddAccount success", async () => {
            const { sut } = makeSut();
            const response = await sut.handle(makeFakeRequest());
            expect(response.status).toBe(200);
        });

        test("Should return status 403 if AddAccount returns null", async () => {
            const { sut, addAccountStub } = makeSut();
            jest.spyOn(addAccountStub, "add").mockReturnValueOnce(
                Promise.resolve(null),
            );
            const response = await sut.handle(makeFakeRequest());
            expect(response.status).toBe(403);
        });

        test("Should return 500 if AddAccount throws", async () => {
            const { sut, addAccountStub } = makeSut();
            jest.spyOn(addAccountStub, "add").mockReturnValueOnce(
                Promise.reject(new Error()),
            );
            const response = await sut.handle(makeFakeRequest());
            expect(response).toEqual({
                status: 500,
                body: new Error(),
            });
        });
    });

    describe("Validation", () => {
        test("Should call validation with correct values", async () => {
            const { sut, validationStub } = makeSut();
            const validateSpy = jest.spyOn(validationStub, "validate");
            const httpRequest = makeFakeRequest();
            await sut.handle(httpRequest);
            expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
        });

        test("Should return 400 if Validation returns an Error", async () => {
            const { sut, validationStub } = makeSut();
            jest.spyOn(validationStub, "validate").mockReturnValueOnce(
                new MissingParamError("any_field"),
            );
            const response = await sut.handle(makeFakeRequest());
            expect(response).toEqual(
                badRequest(new MissingParamError("any_field")),
            );
        });

        test("", () => {});
    });

    describe("Authentication", () => {
        test("Should call Authentication with the correct values", async () => {
            const { sut, authenticationStub } = makeSut();
            const authenticateSpy = jest.spyOn(
                authenticationStub,
                "authenticate",
            );
            await sut.handle(makeFakeRequest());
            expect(authenticateSpy).toHaveBeenCalledWith({
                email: "any_email@mail.com",
                password: "any_password",
            });
        });

        test("Should return an access token on authenticate success", async () => {
            const { sut } = makeSut();
            const response = await sut.handle(makeFakeRequest());
            expect(response).toEqual({ body: "any_token", status: 200 });
        });
    });
});
