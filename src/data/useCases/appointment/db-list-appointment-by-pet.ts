import { ListAppointmentByPetRepository } from "@/data/protocols/db/appointment/list-appointment-by-pet-repository";
import { AppointmentModel } from "@/domain/models/appointment";

export class DbListAppointmentByPet implements ListAppointmentByPetRepository {
    constructor(private readonly repository: ListAppointmentByPetRepository) {}

    async listByPet(pet_id: string): Promise<AppointmentModel[]> {
        const appointments = await this.repository.listByPet(pet_id);
        return appointments;
    }
}
