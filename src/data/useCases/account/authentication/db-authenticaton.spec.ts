import { Hasher } from "@/data/protocols/cryptography/Hasher";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-emailrepository";
import { AccountModel } from "@/domain/models/account";
import { AuthenticationParams } from "@/domain/useCases/account/authenticaton";
import { DbAuthentication } from "./db-authentication";

const mockHasher = (): Hasher => {
    class HasherStub implements Hasher {
        async hash(value: string): Promise<string> {
            return Promise.resolve("any_hash");
        }
    }
    return new HasherStub();
};

const mockLoadAccountByEmail = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
        implements LoadAccountByEmailRepository
    {
        async loadByEmail(email: string): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel());
        }
    }
    return new LoadAccountByEmailRepositoryStub();
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

type SutTypes = {
    sut: DbAuthentication;
    hasherStub: Hasher;
    loadAccountByEmaiLStub;
};

const makeSut = (): SutTypes => {
    const hasherStub = mockHasher();
    const loadAccountByEmaiLStub = mockLoadAccountByEmail();
    const sut = new DbAuthentication(loadAccountByEmaiLStub, hasherStub);
    return {
        sut,
        hasherStub,
        loadAccountByEmaiLStub,
    };
};

const mockAuthenticationParams = (): AuthenticationParams => {
    return {
        email: "any_email",
        password: "any_password",
    };
};

describe("Authentication", () => {
    test("Should call LoadAccountByEmail with the correct values", async () => {
        const { sut, loadAccountByEmaiLStub } = makeSut();
        const loadByEmailSpy = jest.spyOn(
            loadAccountByEmaiLStub,
            "loadByEmail",
        );
        await sut.authenticate(mockAuthenticationParams());
        expect(loadByEmailSpy).toHaveBeenCalledWith("any_email");
    });
});
