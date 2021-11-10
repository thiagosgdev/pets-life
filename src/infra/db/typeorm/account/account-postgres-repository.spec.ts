import { AddAccountParams } from "@/domain/useCases/account/add-account";
//import CreateConnection from "@/infra/db/typeorm/helpers/typeorm-helper";
import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";
import { Connection } from "typeorm";
import { AccountPostgresRepository } from "./account-postgres-repository";

let newConnection: Connection;

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
        //newConnection = await CreateConnection();
        //await newConnection.runMigrations();
    });

    beforeEach(() => {
        connection.clear();
    });
    afterAll(() => {
        connection.close();
    });

    test("Should be able to add a new Account", async () => {
        const { sut } = makeSut();
        const account = await sut.add(mockAddAccountParams());
        expect(account).toHaveProperty("id");
    });
});