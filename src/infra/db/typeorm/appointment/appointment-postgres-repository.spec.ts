import {
    mockAddAccountParams,
    mockAddAppointmentParams,
    mockAddPetParams,
} from "@/domain/test";
import { AccountPostgresRepository } from "../account/account-postgres-repository";
import { connection } from "../helpers/typeorm-helper";
import { PetPostgresRepository } from "../pet/pet-postgres-repository";
import { AppointmentPostgresRepository } from "./appointment-postgres-repository";

const makeSut = () => {
    const sut = new AppointmentPostgresRepository();
    const petPostgresRepository = new PetPostgresRepository();
    const addAccountPostgresRepository = new AccountPostgresRepository();
    return {
        sut,
        petPostgresRepository,
        addAccountPostgresRepository,
    };
};

describe("Appointment Postgres Repository", () => {
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

    test("Should return the appointment on add() success", async () => {
        const { sut, petPostgresRepository, addAccountPostgresRepository } =
            makeSut();
        const account = await addAccountPostgresRepository.add(
            mockAddAccountParams(),
        );
        const pet = await petPostgresRepository.add(
            Object.assign(mockAddPetParams(), { account_id: account.id }),
        );
        const appointmentParams = mockAddAppointmentParams();
        appointmentParams.pet_id = pet.id;
        const appointment = await sut.add(appointmentParams);
        expect(appointment).toHaveProperty("id");
    });

    test("Should throw if add() throws", async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "add").mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.add(mockAddAppointmentParams());
        await expect(promise).rejects.toThrow();
    });
});