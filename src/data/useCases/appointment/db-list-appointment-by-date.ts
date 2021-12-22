import { ListAppointmentByDateRepository } from "@/data/protocols/db/appointment/list-appointment-by-date-repository";
import { AppointmentModel } from "@/domain/models/appointment";
import { ListAppointmentByDate } from "@/domain/useCases/appointment/list-appointment-by-date";

export class DbListAppointmentByDate
    implements ListAppointmentByDateRepository
{
    constructor(
        private readonly listAppointmentByDate: ListAppointmentByDateRepository,
    ) {}
    async execute(
        start_date: Date,
        end_date?: Date,
    ): Promise<AppointmentModel[]> {
        await this.listAppointmentByDate.execute(start_date, end_date);
        return null;
    }
}
