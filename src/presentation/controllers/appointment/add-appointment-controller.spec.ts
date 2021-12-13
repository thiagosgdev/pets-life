import {
    mockAddAppointment,
    mockAddAppointmentParams,
} from "@/domain/test/mock-appointment";
import { AddAppointment } from "@/domain/useCases/appointment/add-appointment";
import { HttpRequest } from "@/presentation/protocols";
import { AddAppointmentController } from "./add-appointment-controller";
import MockDate from "mockdate";

const makeHttpRequest = (): HttpRequest => ({
    body: mockAddAppointmentParams(),
});

type SutTypes = {
    sut: AddAppointmentController;
    addAppointmentStub: AddAppointment;
};

const makeSut = (): SutTypes => {
    const addAppointmentStub = mockAddAppointment();
    const sut = new AddAppointmentController(addAppointmentStub);
    return {
        addAppointmentStub,
        sut,
    };
};

describe("Add Appointment Controller", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test("Should call AddAppointment with the correct values", async () => {
        const { sut, addAppointmentStub } = makeSut();
        const addSpy = jest.spyOn(addAppointmentStub, "add");
        await sut.handle(makeHttpRequest());
        expect(addSpy).toHaveBeenCalledWith(mockAddAppointmentParams());
    });

    test("Should return 201 on AddAppointment success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeHttpRequest());
        expect(response.status).toBe(201);
    });

    test("Should return 200 on AddAppointment fail", async () => {
        const { sut, addAppointmentStub } = makeSut();
        jest.spyOn(addAppointmentStub, "add").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const response = await sut.handle(makeHttpRequest());
        expect(response.status).toBe(200);
    });
});
