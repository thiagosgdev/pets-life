import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";
import { AccountPostgresRepository } from "./account-postgres-repository";

const mockAddAccountParams = (): AddAccountParams => ({
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
});

type SutTypes = {
    sut: AccountPostgresRepository;
};

const makeSut = (): SutTypes => {
    const sut = new AccountPostgresRepository();
    return {
        sut,
    };
};

describe("Account Postgres Repository", () => {
    beforeAll(async () => {
        let migrations = await connection.create();
        await migrations.runMigrations();
    });

    beforeEach(async () => {
        await connection.clear();
    });
    afterAll(async () => {
        await connection.close();
    });

    test("Should be able to add a new Account", async () => {
        const { sut } = makeSut();
        const account = await sut.add(mockAddAccountParams());
        expect(account).toHaveProperty("id");
    });

    test("Should an account on loadByEmail success", async () => {
        const { sut } = makeSut();
        await sut.add(mockAddAccountParams());
        const account = await sut.loadByEmail("any_email@mail.com");
        expect(account).toBeTruthy();
    });

    test("Should return null if loadByEmail doesn't find an account", async () => {
        const { sut } = makeSut();
        const account = await sut.loadByEmail("any_email@mail.com");
        expect(account).toBeFalsy();
    });

    test("Should call updateToken with the correct values", async () => {
        const { sut } = makeSut();
        const account = await sut.add(mockAddAccountParams());
        const updateTokenSpy = jest.spyOn(sut, "updateToken");
        await sut.updateToken("any_token", account.id);
        expect(updateTokenSpy).toHaveBeenCalledWith("any_token", account.id);
    });

    test("Should return null if updateToken doesn't find an account", async () => {
        const { sut } = makeSut();
        const response = await sut.updateToken(
            "any_token",
            "e5012938-321f-4835-8496-db02831bef9c",
        );
        expect(response).toBeNull();
    });
});
