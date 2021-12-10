import { AppointmentModel } from "@/domain/models/appointment";

export type AddAppointmentParams = {
    description: string;
    pet_id: string;
    doctor_name: string;
    scheduled_date: Date;
};

export interface AddAppointment {
    add(data: AddAppointmentParams): Promise<AppointmentModel>;
}
