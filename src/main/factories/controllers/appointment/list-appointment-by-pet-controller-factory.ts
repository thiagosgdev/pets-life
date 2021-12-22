import { ListAppointmentByPetController } from "@/presentation/controllers/appointment/list-appointment-by-pet-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbListAppointmentByPet } from "../../usecases/appointment/db-list-appointment-by-pet-factory";

export const makeListAppointmentByPetController = (): Controller => {
    const controller = new ListAppointmentByPetController(
        makeDbListAppointmentByPet(),
    );
    return controller;
};
