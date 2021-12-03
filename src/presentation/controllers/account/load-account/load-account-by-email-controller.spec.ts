import { mockLoadAccountByEmail } from "@/domain/test";
import { LoadAccountByEmail } from "@/domain/useCases/account/load-account-by-email";
import { HttpRequest } from "@/presentation/protocols";
import { LoadAccountByEmaiLController } from "./load-account-by-email-controller";

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: "any_email@mail.com",
    },
});

type SutTypes = {
    sut: LoadAccountByEmaiLController;
    loadAccountByEmailStub: LoadAccountByEmail;
};

const makeSut = (): SutTypes => {
    const loadAccountByEmailStub = mockLoadAccountByEmail();
    const sut = new LoadAccountByEmaiLController(loadAccountByEmailStub);
    return {
        sut,
        loadAccountByEmailStub,
    };
};

describe("Load Account By Email Controller", () => {
    test("Should call LoadAccountByEmail with the correct value", async () => {
        const { sut, loadAccountByEmailStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailStub, "load");
        await sut.handle(makeFakeRequest());
        expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
    });

    test("Should return 200 on LoadAccountByEmail success", async () => {
        const { sut } = makeSut();
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
    });

    test("Should return 200 on LoadAccountByEmail fail", async () => {
        const { sut, loadAccountByEmailStub } = makeSut();
        jest.spyOn(loadAccountByEmailStub, "load").mockReturnValueOnce(
            Promise.resolve(null),
        );
        const response = await sut.handle(makeFakeRequest());
        expect(response.status).toBe(200);
        expect(response.body).toBe("Check the e-mail informed");
    });
});
