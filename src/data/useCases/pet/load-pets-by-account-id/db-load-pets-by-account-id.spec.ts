import { LoadPetsByAccountIdRepository } from "@/data/protocols/db/pet/load-pets-by-account-id-repository";
import { PetModel } from "@/domain/models/pet";
import { DbLoadPetsByAccountId } from "./db-load-pets-by-account-id";

const mockPetModels = (): PetModel[] => [
    {
        id: "any_id",
        name: "any_name",
        birthdate: new Date(),
        gender: 1,
        chip_number: "any_chip_number",
        chip_website: "any_chip_website",
        breed: "any_breed",
        weigth: 1,
        accountt_id: "any_account_id",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "other_id",
        name: "other_name",
        birthdate: new Date(),
        gender: 1,
        chip_number: "other_chip_number",
        chip_website: "other_chip_website",
        breed: "other_breed",
        weigth: 1,
        accountt_id: "other_account_id",
        created_at: new Date(),
        updated_at: new Date(),
    },
];

const mockLoadPetsByAccountIdRepository = (): LoadPetsByAccountIdRepository => {
    class LoadPetsByAccountIdRepositoryStub
        implements LoadPetsByAccountIdRepository
    {
        async load(): Promise<PetModel[]> {
            return Promise.resolve(mockPetModels());
        }
    }
    return new LoadPetsByAccountIdRepositoryStub();
};

type SutTypes = {
    sut: DbLoadPetsByAccountId;
    loadPetsByAccountIdRepositoryStub: LoadPetsByAccountIdRepository;
};

const makeSut = (): SutTypes => {
    const loadPetsByAccountIdRepositoryStub =
        mockLoadPetsByAccountIdRepository();
    const sut = new DbLoadPetsByAccountId(loadPetsByAccountIdRepositoryStub);
    return {
        loadPetsByAccountIdRepositoryStub,
        sut,
    };
};

describe("DbLoadPetsByAccountId", () => {
    test("Should call LoadPetsByAccountIdRepository with correct value", async () => {
        const { sut, loadPetsByAccountIdRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadPetsByAccountIdRepositoryStub, "load");
        await sut.load("any_account_id");
        expect(loadSpy).toHaveBeenCalledWith("any_account_id");
    });
});
