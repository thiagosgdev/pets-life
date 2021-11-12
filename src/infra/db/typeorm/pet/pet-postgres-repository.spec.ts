import { AddAccountParams } from "@/domain/useCases/account/add-account";
import { AddPetParams } from "@/domain/useCases/pet/add-pet";
import { AccountPostgresRepository } from "../account/account-postgres-repository";
import { connection } from "../helpers/typeorm-helper";
import { PetPostgresRepository } from "./pet-postgres-repository";

const mockAddPetParams = (): AddPetParams => ({
    name: "any_name",
    birthdate: new Date(),
    gender: 1,
    chip_number: "any_chip_number",
    chip_website: "any_chip_website",
    breed: "any_breed",
    weigth: 1,
    account_id: "",
});

const mockAddAccountParams = (): AddAccountParams => ({
    name: "any_name",
    last_name: "any_last_name",
    cellphone: "any_cellphone",
    zip_code: "any_zip_code",
    email: "any_email@mail.com",
    password: "any_password",
});

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

    beforeEach(() => {
        connection.clear();
    });
    afterAll(() => {
        connection.close();
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
});
