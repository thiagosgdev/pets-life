import { AppointmentModel } from "@/domain/models/appointment";
import { mockAppointmentModel } from "@/domain/test";
import { AddAppointmentParams } from "@/domain/useCases/appointment/add-appointment";
import { AddAppointmentRepository } from "../protocols/db/appointment/add-appointment-repository";

export const mockAddAppointmentRepostiory = (): AddAppointmentRepository => {
    class AddAppointmentRepositoryStub implements AddAppointmentRepository {
        add(data: AddAppointmentParams): Promise<AppointmentModel> {
            return Promise.resolve(mockAppointmentModel());
        }
    }
    return new AddAppointmentRepositoryStub();
};
