import { AppointmentModel } from "@/domain/models/appointment";

export interface ListAppointmentByPet {
    listByPet(pet_id: string): Promise<AppointmentModel[]>;
}
