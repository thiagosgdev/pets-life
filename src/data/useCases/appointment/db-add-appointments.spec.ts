import { AddAppointmentRepository } from "@/data/protocols/db/appointment/add-appointment-repository";
import { DbAddAppointment } from "./db-add-appointment";
import MockDate from "mockdate";
import { mockAddAppointmentRepostiory } from "@/data/test";
import { mockAddAppointmentParams } from "@/domain/test";

type SutTypes = {
    sut: DbAddAppointment;
    addAppointmentRepositoryStub: AddAppointmentRepository;
};

const makeSut = (): SutTypes => {
    const addAppointmentRepositoryStub = mockAddAppointmentRepostiory();
    const sut = new DbAddAppointment(addAppointmentRepositoryStub);
    return {
        addAppointmentRepositoryStub,
        sut,
    };
};

describe("Db Add Appointment", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should call AddAppointmentRepository with the correct values", async () => {
        const { sut, addAppointmentRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addAppointmentRepositoryStub, "add");
        await sut.add(mockAddAppointmentParams());
        expect(addSpy).toHaveBeenCalledWith(mockAddAppointmentParams());
    });

    test("Should return the appointment on AddAppointmentRepository success", async () => {
        const { sut } = makeSut();
        const appointment = await sut.add(mockAddAppointmentParams());
        expect(appointment).toHaveProperty("id");
    });

    test("Should return null on AddAppointmentRepository fail", async () => {
        const { sut, addAppointmentRepositoryStub } = makeSut();
        jest.spyOn(addAppointmentRepositoryStub, "add").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const appointment = await sut.add(mockAddAppointmentParams());
        expect(appointment).toBeNull();
    });

    test("Should throw if AddAppointmentRepository throws", async () => {
        const { sut, addAppointmentRepositoryStub } = makeSut();
        jest.spyOn(addAppointmentRepositoryStub, "add").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const appointment = sut.add(mockAddAppointmentParams());
        await expect(appointment).rejects.toThrow();
    });
});
