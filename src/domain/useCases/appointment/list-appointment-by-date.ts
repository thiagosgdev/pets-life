import { AppointmentModel } from "@/domain/models/appointment";

export interface ListAppointmentByDate {
    listByDate(start_date: Date, end_date?: Date): Promise<AppointmentModel[]>;
}
