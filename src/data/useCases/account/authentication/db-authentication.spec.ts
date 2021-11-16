import { Encrypter } from "@/data/protocols/cryptography/Encrypter";
import { HashComparer } from "@/data/protocols/cryptography/Hash-Comparer";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-emailrepository";
import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/update-access-token-repository";
import { AccountModel } from "@/domain/models/account";
import { AuthenticationParams } from "@/domain/useCases/account/authenticaton";
import { DbAuthentication } from "./db-authentication";

const mockUpdateAccessToken = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenStub implements UpdateAccessTokenRepository {
        async updateToken(token: string, id: string): Promise<void> {}
    }
    return new UpdateAccessTokenStub();
};

const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(data: string): Promise<string> {
            return Promise.resolve("any_token");
        }
    }
    return new EncrypterStub();
};

const mockHashComparer = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return Promise.resolve(true);
        }
    }
    return new HashComparerStub();
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
    hashComparerStub: HashComparer;
    loadAccountByEmaiLStub: LoadAccountByEmailRepository;
    encrypterStub: Encrypter;
    updateAccessTokenStub: UpdateAccessTokenRepository;
};

const makeSut = (): SutTypes => {
    const hashComparerStub = mockHashComparer();
    const encrypterStub = mockEncrypter();
    const updateAccessTokenStub = mockUpdateAccessToken();
    const loadAccountByEmaiLStub = mockLoadAccountByEmail();
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
        expect(encryptSpy).toHaveBeenLastCalledWith("any_id");
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

    test("Should throw if Encrypter throws", async () => {
        const { sut, updateAccessTokenStub } = makeSut();
        jest.spyOn(updateAccessTokenStub, "updateToken").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.authenticate(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test("", () => {});
});
