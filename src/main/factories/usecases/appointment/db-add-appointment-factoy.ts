import { DbAddAppointment } from "@/data/useCases/appointment/db-add-appointment";
import { AddAppointment } from "@/domain/useCases/appointment/add-appointment";
import { AppointmentPostgresRepository } from "@/infra/db/typeorm/appointment/appointment-postgres-repository";

export const makeDbAddAppointment = (): AddAppointment => {
    const appointmentPostgresRepository = new AppointmentPostgresRepository();
    return new DbAddAppointment(appointmentPostgresRepository);
};
