import { DbListAppointmentByPet } from "@/data/useCases/appointment/db-list-appointment-by-pet";
import { ListAppointmentByPet } from "@/domain/useCases/appointment/list-appointment-by-pet";
import { AppointmentPostgresRepository } from "@/infra/db/typeorm/appointment/appointment-postgres-repository";

export const makeDbListAppointmentByPet = (): ListAppointmentByPet => {
    const appointmentPostgresRepository = new AppointmentPostgresRepository();
    return new DbListAppointmentByPet(appointmentPostgresRepository);
};
