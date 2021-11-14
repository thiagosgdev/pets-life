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

const mockAddAccountParams = (): AddAccountParams => ({
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
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

    test("", () => {});
});
