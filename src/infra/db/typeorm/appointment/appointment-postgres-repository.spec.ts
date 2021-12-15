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
        await connection.clear();
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

    test("Should return the appointments on listByPet() success", async () => {
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
        await sut.add(appointmentParams);
        await sut.add(appointmentParams);
        const appointments = await sut.listByPet(pet.id);
        expect(appointments.length).toBe(2);
    });

    test("Should return null on listByPet() fail", async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "listByPet").mockReturnValueOnce(Promise.resolve(null));
        const promise = await sut.listByPet("any_pet_id");
        expect(promise).toBeNull();
    });

    test("Should throw if listByPet() throws", async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "listByPet").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const promise = sut.listByPet("any_pet_id");
        await expect(promise).rejects.toThrow();
    });
});
