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
        await this.listAppointmentByPet.listByPet(pet_id);
        return null;
    }
}
