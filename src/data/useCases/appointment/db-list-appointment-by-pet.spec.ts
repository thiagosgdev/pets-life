import { ListAppointmentByPetRepository } from "@/data/protocols/db/appointment/list-appointment-by-pet-repository";
import { AppointmentModel } from "@/domain/models/appointment";
import { mockAppointmentModels } from "@/domain/test";
import { DbListAppointmentByPet } from "./db-list-appointment-by-pet";

const mockListAppointmentByPetRepository =
    (): ListAppointmentByPetRepository => {
        class ListAppointmentByPetRepositoryStub
            implements ListAppointmentByPetRepository
        {
            listByPet(pet_id: string): Promise<AppointmentModel[]> {
                return Promise.resolve(mockAppointmentModels());
            }
        }
        return new ListAppointmentByPetRepositoryStub();
    };

type SutTypes = {
    sut: DbListAppointmentByPet;
    listAppointmentByPetStub: ListAppointmentByPetRepository;
};

const makeSut = (): SutTypes => {
    const listAppointmentByPetStub = mockListAppointmentByPetRepository();
    const sut = new DbListAppointmentByPet(listAppointmentByPetStub);
    return {
        listAppointmentByPetStub,
        sut,
    };
};

describe("Db List Appointment By Pet", () => {
    test("Should call ListAppointmentByPetRepository with the correct values", async () => {
        const { sut, listAppointmentByPetStub } = makeSut();
        const listSpy = jest.spyOn(listAppointmentByPetStub, "listByPet");
        await sut.listByPet("any_pet_id");
        expect(listSpy).toHaveBeenCalledWith("any_pet_id");
    });

    test("Should return the list on ListAppointmentByPetRepository success", async () => {
        const { sut } = makeSut();
        const appointments = await sut.listByPet("any_pet_id");
        expect(appointments.length).toBe(2);
    });

    test("Should return null on ListAppointmentByPetRepository fail", async () => {
        const { sut, listAppointmentByPetStub } = makeSut();
        jest.spyOn(listAppointmentByPetStub, "listByPet").mockReturnValueOnce(
            Promise.resolve([]),
        );
        const appointments = await sut.listByPet("any_pet_id");
        expect(appointments).toBeNull();
    });

    test("Should throw if ListAppointmentByPetRepository throws", async () => {
        const { sut, listAppointmentByPetStub } = makeSut();
        jest.spyOn(listAppointmentByPetStub, "listByPet").mockReturnValueOnce(
            Promise.reject(new Error()),
        );
        const appointments = sut.listByPet("any_pet_id");
        await expect(appointments).rejects.toThrow();
    });
});
