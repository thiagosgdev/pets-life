import { AppointmentModel } from "@/domain/models/appointment";

export interface ListAppointmentByDateRepository {
    execute(start_date: Date, end_date?: Date): Promise<AppointmentModel[]>;
}
