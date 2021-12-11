import { AppointmentModel } from "../models/appointment";
import { AddAppointmentParams } from "../useCases/appointment/add-appointment";

export const mockAppointmentModel = (): AppointmentModel => ({
    id: "any_id",
    description: "any_description",
    pet_id: "any_pet_id",
    doctor_name: "any_doctor_name",
    scheduled_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
});

export const mockAddAppointmentParams = (): AddAppointmentParams => ({
    description: "any_description",
    pet_id: "any_pet_id",
    doctor_name: "any_doctor_name",
    scheduled_date: new Date(),
});
