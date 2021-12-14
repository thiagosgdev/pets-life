import { AppointmentModel } from "@/domain/models/appointment";

export interface ListAppointmentByPetRepository {
    listByPet(pet_id: string): Promise<AppointmentModel[]>;
}
