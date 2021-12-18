import { ListAppointmentByPet } from "@/domain/useCases/appointment/list-appointment-by-pet";
import {
    Controller,
    HttpRequest,
    HttpResponse,
} from "@/presentation/protocols";

export class ListAppointmentByPetController implements Controller {
    constructor(private readonly listAppointmentByPet: ListAppointmentByPet) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { pet_id } = httpRequest.body;
        const appointments = await this.listAppointmentByPet.listByPet(pet_id);
        if (appointments.length > 0) {
            return {
                status: 200,
                body: appointments,
            };
        }
    }
}
