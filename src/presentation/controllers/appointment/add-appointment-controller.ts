import { AddAppointment } from "@/domain/useCases/appointment/add-appointment";
import {
    Controller,
    HttpRequest,
    HttpResponse,
} from "@/presentation/protocols";
import { AddAppointmentParams } from "@/domain/useCases/appointment/add-appointment";

export class AddAppointmentController implements Controller {
    constructor(private readonly addAppointment: AddAppointment) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const data: AddAppointmentParams = request.body;
        const appointment = await this.addAppointment.add(data);
        if (appointment) {
            return {
                status: 201,
                body: appointment,
            };
        }
        return {
            status: 200,
            body: "Error - Check the appointment values",
        };
    }
}
