import { AppointmentModel } from "@/domain/models/appointment";
import { AddAppointmentParams } from "@/domain/useCases/appointment/add-appointment";

export interface AddAppointmentRepository {
    add(data: AddAppointmentParams): Promise<AppointmentModel>;
}
