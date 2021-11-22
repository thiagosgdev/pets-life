import { Encrypter, HashComparer } from "@/data/protocols/cryptography";
import {
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
} from "@/data/protocols/db/account";
import {
    mockEncrypter,
    mockHashComparer,
    mockUpdateAccessToken,
} from "@/data/test";
import { throwError } from "@/data/test/test-helper";
import { AccountModel } from "@/domain/models/account";
import { mockAccountModel } from "@/domain/test";
import { AuthenticationParams } from "@/domain/useCases/account/authenticaton";
import { DbAuthentication } from "./db-authentication";

export const mockLoadAccountByEmailRepository =
    (): LoadAccountByEmailRepository => {
        class LoadAccountByEmailRepositoryStub
            implements LoadAccountByEmailRepository
        {
            async loadByEmail(email: string): Promise<AccountModel> {
                return Promise.resolve(mockAccountModel());
            }
        }
        return new LoadAccountByEmailRepositoryStub();
    };

type SutTypes = {
    sut: DbAuthentication;
    hashComparerStub: HashComparer;
    loadAccountByEmaiLStub: LoadAccountByEmailRepository;
    encrypterStub: Encrypter;
    updateAccessTokenStub: UpdateAccessTokenRepository;
};

const makeSut = (): SutTypes => {
    const hashComparerStub = mockHashComparer();
    const encrypterStub = mockEncrypter();
    const updateAccessTokenStub = mockUpdateAccessToken();
    const loadAccountByEmaiLStub = mockLoadAccountByEmailRepository();
    const sut = new DbAuthentication(
        loadAccountByEmaiLStub,
        hashComparerStub,
        encrypterStub,
        updateAccessTokenStub,
    );
    return {
        sut,
        hashComparerStub,
        loadAccountByEmaiLStub,
        encrypterStub,
        updateAccessTokenStub,
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

    test("Should return null if LoadAccountByEmail returns null", async () => {
        const { sut, loadAccountByEmaiLStub } = makeSut();
        jest.spyOn(loadAccountByEmaiLStub, "loadByEmail").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const account = await sut.authenticate(mockAuthenticationParams());
        expect(account).toBe(null);
    });

    test("Should throw if LoadAccountByEmail throws", async () => {
        const { sut, loadAccountByEmaiLStub } = makeSut();
        jest.spyOn(loadAccountByEmaiLStub, "loadByEmail").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.authenticate(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call HasheComparer with the correct value", async () => {
        const { sut, hashComparerStub } = makeSut();
        const hasherSpy = jest.spyOn(hashComparerStub, "compare");
        await sut.authenticate(mockAuthenticationParams());
        expect(hasherSpy).toHaveBeenCalledWith("any_password", "any_password");
    });

    test("Should throw if HasheComparer throws", async () => {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, "compare").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.authenticate(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call Encrypter with the correct values", async () => {
        const { sut, encrypterStub } = makeSut();
        const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
        await sut.authenticate(mockAuthenticationParams());
        expect(encryptSpy).toHaveBeenCalledWith("any_id");
    });

    test("Shoudl return a token on Encrypter success", async () => {
        const { sut } = makeSut();
        const token = await sut.authenticate(mockAuthenticationParams());
        expect(token).toBe("any_token");
    });

    test("Should throw if Encrypter throws", async () => {
        const { sut, encrypterStub } = makeSut();
        jest.spyOn(encrypterStub, "encrypt").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.authenticate(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test("Should call UpdateAccessTokenRepository with the correct values", async () => {
        const { sut, updateAccessTokenStub } = makeSut();
        const updateTokenSpy = jest.spyOn(updateAccessTokenStub, "updateToken");
        await sut.authenticate(mockAuthenticationParams());
        expect(updateTokenSpy).toHaveBeenCalledWith("any_token", "any_id");
    });

    test("Should throw if UpdateAccessTokenRepository throws", async () => {
        const { sut, updateAccessTokenStub } = makeSut();
        jest.spyOn(updateAccessTokenStub, "updateToken").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.authenticate(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });
});
