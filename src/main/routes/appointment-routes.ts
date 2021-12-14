import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddAppointmentController } from "../factories/controllers/appointment/add-appointment-controller-factory";

export default (router: Router): void => {
    router.post("/appointment", adaptRoute(makeAddAppointmentController()));
};
