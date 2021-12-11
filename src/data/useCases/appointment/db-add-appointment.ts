import { AddAppointmentRepository } from "@/data/protocols/db/appointment/add-appointment-repository";
import { AppointmentModel } from "@/domain/models/appointment";
import { AddAppointmentParams } from "@/domain/useCases/appointment/add-appointment";

export class DbAddAppointment implements AddAppointmentRepository {
    constructor(
        private readonly addAppointmentRepository: AddAppointmentRepository,
    ) {}

    async add(data: AddAppointmentParams): Promise<AppointmentModel> {
        const appointment = await this.addAppointmentRepository.add(data);
        if (appointment) {
            return appointment;
        }
        return null;
    }
}
