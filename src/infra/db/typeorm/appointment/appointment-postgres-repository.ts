import { Appointment } from "@/domain/entities/Appointment";
import { AppointmentModel } from "@/domain/models/appointment";
import {
    AddAppointment,
    AddAppointmentParams,
} from "@/domain/useCases/appointment/add-appointment";
import { getRepository, Repository } from "typeorm";

export class AppointmentPostgresRepository implements AddAppointment {
    private repository: Repository<Appointment>;
    constructor() {
        this.repository = getRepository(Appointment);
    }

    async add(data: AddAppointmentParams): Promise<AppointmentModel> {
        const appointment = this.repository.create(data);
        await this.repository.save(appointment);
        return appointment;
    }
}
