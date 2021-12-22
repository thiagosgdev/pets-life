import { ListAppointmentByDateRepository } from "@/data/protocols/db/appointment/list-appointment-by-date-repository";
import { AppointmentModel } from "@/domain/models/appointment";
import { mockAppointmentModels } from "@/domain/test";
import { DbListAppointmentByDate } from "./db-list-appointment-by-date";
import MockDate from "mockdate";

const mockListAppointmentByDate = (): ListAppointmentByDateRepository => {
    class ListAppointmentByDateStub implements ListAppointmentByDateRepository {
        execute(
            start_date: Date,
            end_date?: Date,
        ): Promise<AppointmentModel[]> {
            return Promise.resolve(mockAppointmentModels());
        }
    }
    return new ListAppointmentByDateStub();
};

type SutTypes = {
    sut: DbListAppointmentByDate;
    listAppointmentByDateStub: ListAppointmentByDateRepository;
};

const makeSut = (): SutTypes => {
    const listAppointmentByDateStub = mockListAppointmentByDate();
    const sut = new DbListAppointmentByDate(listAppointmentByDateStub);
    return {
        sut,
        listAppointmentByDateStub,
    };
};

describe("Db List Appointment By Date", () => {
    const start_date = new Date();
    const end_date = new Date();

    test("Should call ListAppointmentByDate with the correct values", async () => {
        const { sut, listAppointmentByDateStub } = makeSut();
        const listSpy = jest.spyOn(listAppointmentByDateStub, "execute");
        await sut.execute(start_date, end_date);
        expect(listSpy).toHaveBeenCalledWith(start_date, end_date);
    });
});
