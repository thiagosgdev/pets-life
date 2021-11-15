import { PetModel } from "@/domain/models/pet";
import { AddPet, AddPetParams } from "@/domain/useCases/pet/add-pet";
import { HttpRequest } from "@/presentation/protocols/http";
import { AddPetController } from "./add-pet-controller";
import Mockdate from "mockdate";

const mockPetModel = (): PetModel => ({
    id: "any_id",
    name: "any_name",
    birthdate: new Date(),
    gender: 1,
    chip_number: "any_chip_number",
    chip_website: "any_chip_website",
    breed: "any_breed",
    weigth: 1,
    account_id: "any_account_id",
    created_at: new Date(),
    updated_at: new Date(),
});

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

const mockAddPet = (): AddPet => {
    class AddPetStub implements AddPet {
        add(data: AddPetParams): Promise<PetModel> {
            return Promise.resolve(mockPetModel());
        }
    }
    return new AddPetStub();
};

type SutTypes = {
    sut: AddPetController;
    addPetStub: AddPet;
};
const makeSut = (): SutTypes => {
    const addPetStub = mockAddPet();
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
});
