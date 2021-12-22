import { AppointmentModel } from "@/domain/models/appointment";
import { mockAppointmentModel } from "@/domain/test";
import { ListAppointmentByPet } from "@/domain/useCases/appointment/list-appointment-by-pet";
import { HttpRequest } from "@/presentation/protocols";
import { ListAppointmentByPetController } from "./list-appointment-by-pet-controller";

const makeFakeRequest = (): HttpRequest => ({
    params: {
        pet_id: "any_pet_id",
    },
});
const mockListAppointmentByPet = (): ListAppointmentByPet => {
    class ListAppointmentByPetStub implements ListAppointmentByPet {
        async listByPet(pet_id: string): Promise<AppointmentModel[]> {
            return Promise.resolve([
                mockAppointmentModel(),
                mockAppointmentModel(),
            ]);
        }
    }
    return new ListAppointmentByPetStub();
};

type SutTypes = {
    sut: ListAppointmentByPetController;
    listAppointmentByPet: ListAppointmentByPet;
};

const makeSut = (): SutTypes => {
    const listAppointmentByPet = mockListAppointmentByPet();
    const sut = new ListAppointmentByPetController(listAppointmentByPet);
    return {
        listAppointmentByPet,
        sut,
    };
};

describe("List Appointments By Pet Controller", () => {
    test("Should call ListAppoinments with the correct values", async () => {
        const { sut, listAppointmentByPet } = makeSut();
        const listSpy = jest.spyOn(listAppointmentByPet, "listByPet");
        await sut.handle(makeFakeRequest());
        expect(listSpy).toHaveBeenCalledWith("any_pet_id");
    });

    test("Should return 200 on ListAppoinments success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
    });

    test("Should return 204 on ListAppoinments fail", async () => {
        const { sut, listAppointmentByPet } = makeSut();
        jest.spyOn(listAppointmentByPet, "listByPet").mockReturnValueOnce(
            Promise.resolve([]),
        );
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(204);
    });

    test("Should return 500 if ListAppoinments throws", async () => {
        const { sut, listAppointmentByPet } = makeSut();
        jest.spyOn(listAppointmentByPet, "listByPet").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(500);
    });
});
