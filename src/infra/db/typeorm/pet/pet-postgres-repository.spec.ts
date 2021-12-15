import { mockAddAccountParams, mockAddPetParams } from "@/domain/test";
import { AccountPostgresRepository } from "@/infra/db/typeorm/account/account-postgres-repository";
import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";
import { PetPostgresRepository } from "./pet-postgres-repository";

type SutTypes = {
    sut: PetPostgresRepository;
    addAccountPostgresRepository: AccountPostgresRepository;
};

const makeSut = (): SutTypes => {
    const sut = new PetPostgresRepository();
    const addAccountPostgresRepository = new AccountPostgresRepository();
    return {
        sut,
        addAccountPostgresRepository,
    };
};

describe("Pet Postgres Repository", () => {
    beforeAll(async () => {
        let migrations = await connection.create();
        await migrations.runMigrations();
    });

    beforeEach(async () => {
        await connection.clear();
    });
    afterAll(async () => {
        await connection.clear();
        await connection.close();
    });

    test("Should be able to add a new Pet", async () => {
        const { sut, addAccountPostgresRepository } = makeSut();
        const account = await addAccountPostgresRepository.add(
            mockAddAccountParams(),
        );
        const pet = await sut.add(
            Object.assign(mockAddPetParams(), { account_id: account.id }),
        );
        expect(pet).toHaveProperty("id");
    });

    test("Should load all the Pets from an user", async () => {
        const { sut, addAccountPostgresRepository } = makeSut();
        const account = await addAccountPostgresRepository.add(
            mockAddAccountParams(),
        );
        await sut.add(
            Object.assign(mockAddPetParams(), { account_id: account.id }),
        );
        const pets = await sut.loadByAccountId(account.id);
        expect(pets.length).toBe(1);
    });
    test("Should return null if no Pet is found", async () => {
        const { sut, addAccountPostgresRepository } = makeSut();
        const account = await addAccountPostgresRepository.add(
            mockAddAccountParams(),
        );
        const pets = await sut.loadByAccountId(account.id);
        expect(pets).toBeNull();
    });

    test("Should be able to add a new Pet", async () => {
        const { sut, addAccountPostgresRepository } = makeSut();
        const account = await addAccountPostgresRepository.add(
            mockAddAccountParams(),
        );
        await sut.add(
            Object.assign(mockAddPetParams(), { account_id: account.id }),
        );
        const pet = await sut.load("any_chip_number");
        expect(pet).toHaveProperty("id");
    });

    test("Should return null if no Pet is found on loadByChipNumber", async () => {
        const { sut, addAccountPostgresRepository } = makeSut();
        await addAccountPostgresRepository.add(mockAddAccountParams());
        const pet = await sut.load("any_chip_number");
        expect(pet).toBeNull();
    });
});
