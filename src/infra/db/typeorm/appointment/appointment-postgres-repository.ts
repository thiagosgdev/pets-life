import { Appointment } from "@/domain/entities/Appointment";
import { AppointmentModel } from "@/domain/models/appointment";
import {
    AddAppointment,
    AddAppointmentParams,
} from "@/domain/useCases/appointment/add-appointment";
import { ListAppointmentByPet } from "@/domain/useCases/appointment/list-appointment-by-pet";
import { getRepository, Repository } from "typeorm";

export class AppointmentPostgresRepository
    implements AddAppointment, ListAppointmentByPet
{
    private repository: Repository<Appointment>;
    constructor() {
        this.repository = getRepository(Appointment);
    }

    async add(data: AddAppointmentParams): Promise<AppointmentModel> {
        const appointment = this.repository.create(data);
        await this.repository.save(appointment);
        return appointment;
    }

    async listByPet(pet_id: string): Promise<AppointmentModel[]> {
        const appointments = await this.repository.find({ pet_id });
        if (appointments.length > 0) {
            return appointments;
        }
    }
}
