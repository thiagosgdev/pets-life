import { AddAppointmentController } from "@/presentation/controllers/appointment/add-appointment-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbAddAppointment } from "../../usecases/appointment/db-add-appointment-factoy";

export const makeAddAppointmentController = (): Controller => {
    const controller = new AddAppointmentController(makeDbAddAppointment());
    return controller;
};
