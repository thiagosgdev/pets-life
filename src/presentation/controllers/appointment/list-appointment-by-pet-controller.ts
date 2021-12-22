import { ListAppointmentByPet } from "@/domain/useCases/appointment/list-appointment-by-pet";
import {
    Controller,
    HttpRequest,
    HttpResponse,
} from "@/presentation/protocols";

export class ListAppointmentByPetController implements Controller {
    constructor(private readonly listAppointmentByPet: ListAppointmentByPet) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { pet_id } = httpRequest.params;
            const appointments = await this.listAppointmentByPet.listByPet(
                pet_id,
            );
            if (appointments.length > 0) {
                return {
                    status: 200,
                    body: appointments,
                };
            }
            return {
                status: 204,
                body: {
                    message: "Verify the pet id informed",
                },
            };
        } catch (error) {
            return {
                status: 500,
                body: {
                    message: "Internal Server Error",
                },
            };
        }
    }
}
