import { AddAppointmentRepository } from "@/data/protocols/db/appointment/add-appointment-repository";
import { AppointmentModel } from "@/domain/models/appointment";
import { AddAppointmentParams } from "@/domain/useCases/appointment/add-appointment";
import { DbAddAppointment } from "./db-add-appointment";
import MockDate from "mockdate";

const mockAddAppointmentRepostiory = (): AddAppointmentRepository => {
    class AddAppointmentRepositoryStub implements AddAppointmentRepository {
        add(data: AddAppointmentParams): Promise<AppointmentModel> {
            return Promise.resolve(mockAppointmentModel());
        }
    }
    return new AddAppointmentRepositoryStub();
};

const mockAppointmentModel = (): AppointmentModel => ({
    id: "any_id",
    description: "any_description",
    pet_id: "any_pet_id",
    doctor_name: "any_doctor_name",
    scheduled_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
});

const mockAddAppointmentParams = (): AddAppointmentParams => ({
    description: "any_description",
    pet_id: "any_pet_id",
    doctor_name: "any_doctor_name",
    scheduled_date: new Date(),
});

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

    test("Should return the appointment on AddAppointmentRepository with the correct values", async () => {
        const { sut } = makeSut();
        const appointment = await sut.add(mockAddAppointmentParams());
        expect(appointment).toHaveProperty("id");
    });
});
