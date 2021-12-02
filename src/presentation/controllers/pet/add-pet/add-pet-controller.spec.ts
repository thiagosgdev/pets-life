import { AddPet } from "@/domain/useCases/pet/add-pet";
import { HttpRequest } from "@/presentation/protocols/http";
import { AddPetController } from "./add-pet-controller";
import Mockdate from "mockdate";
import { mockAddPetsRepository } from "@/data/test";

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: "any_name",
        birthdate: new Date(),
        gender: 1,
        chip_number: "any_chip_number",
        chip_website: "any_chip_website",
        breed: "any_breed",
        weigth: 1,
        account_id: "any_account_id",
    },
});

type SutTypes = {
    sut: AddPetController;
    addPetStub: AddPet;
};
const makeSut = (): SutTypes => {
    const addPetStub = mockAddPetsRepository();
    const sut = new AddPetController(addPetStub);
    return {
        sut,
        addPetStub,
    };
};
describe("Add Pet Controller", () => {
    beforeAll(() => {
        Mockdate.set(new Date());
    });

    afterAll(() => {
        Mockdate.reset();
    });

    test("Should call AddPet with the correct values", async () => {
        const { sut, addPetStub } = makeSut();
        const addSpy = jest.spyOn(addPetStub, "add");
        await sut.handle(makeFakeRequest());
        expect(addSpy).toHaveBeenCalledWith({
            name: "any_name",
            birthdate: new Date(),
            gender: 1,
            chip_number: "any_chip_number",
            chip_website: "any_chip_website",
            breed: "any_breed",
            weigth: 1,
            account_id: "any_account_id",
        });
    });

    test("Should return 200 on AddPet success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
    });
});
