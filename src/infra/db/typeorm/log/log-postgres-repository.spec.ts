import { connection } from "../helpers/typeorm-helper";
import { LogPostgresRepository } from "./log-postgres-repository";

type SutTypes = {
    sut: LogPostgresRepository;
};
const makeSut = (): SutTypes => {
    const sut = new LogPostgresRepository();
    return {
        sut,
    };
};

describe("Log Postgres Repository", () => {
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

    test("Should be able to add a new log", async () => {
        const { sut } = makeSut();
        const spyLogError = jest.spyOn(sut, "logError");
        await sut.logError("any_controller", "any_message");
        expect(spyLogError).toHaveBeenCalledWith(
            "any_controller",
            "any_message",
        );
    });
});
