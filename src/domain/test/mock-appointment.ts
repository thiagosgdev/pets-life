import { AppointmentModel } from "../models/appointment";
import {
    AddAppointment,
    AddAppointmentParams,
} from "../useCases/appointment/add-appointment";

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

export const mockAppointmentModels = (): AppointmentModel[] => [
    {
        id: "any_id",
        description: "any_description",
        pet_id: "any_pet_id",
        doctor_name: "any_doctor_name",
        scheduled_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "another_id",
        description: "another_description",
        pet_id: "another_pet_id",
        doctor_name: "another_doctor_name",
        scheduled_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export const mockAddAppointment = (): AddAppointment => {
    class AddAppointmentStub implements AddAppointment {
        async add(data: AddAppointmentParams): Promise<AppointmentModel> {
            return Promise.resolve(mockAppointmentModel());
        }
    }
    return new AddAppointmentStub();
};
