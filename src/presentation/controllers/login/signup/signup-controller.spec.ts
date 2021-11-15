import { AccountModel } from "@/domain/models/account";
import {
    AddAccount,
    AddAccountParams,
} from "@/domain/useCases/account/add-account";
import { HttpRequest } from "@/presentation/protocols/http";
import { SignUpController } from "./signup-controller";

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(data: AddAccountParams): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new AddAccountStub();
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
};

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccount();
    const sut = new SignUpController(addAccountStub);
    return {
        sut,
        addAccountStub,
    };
};

describe("SignUp Controller", () => {
    describe("Add Account", () => {
        test("Should call AddAccount with the correct values", async () => {
            const { sut, addAccountStub } = makeSut();
            const addSpy = jest.spyOn(addAccountStub, "add");
            await sut.handle(makeFakeRequest());
            expect(addSpy).toHaveBeenCalledWith({
                name: "any_name",
                last_name: "any_last_name",
                cellphone: "any_cellphone",
                zip_code: "any_zip_code",
                email: "any_email@mail.com",
                password: "any_password",
            });
        });
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

    test("", () => {});
});
