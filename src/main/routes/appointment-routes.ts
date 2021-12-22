import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddAppointmentController } from "../factories/controllers/appointment/add-appointment-controller-factory";
import { makeListAppointmentByPetController } from "../factories/controllers/appointment/list-appointment-by-pet-controller-factory";

export default (router: Router): void => {
    router.post("/appointment", adaptRoute(makeAddAppointmentController()));
    router.get(
        "/appointment/:pet_id",
        adaptRoute(makeListAppointmentByPetController()),
    );
};
