import { expect } from "chai";
import { DatabaseService } from "./database.service";
import { LoginService } from "./login.service";

let service: LoginService;
const databaseService: DatabaseService = new DatabaseService();

describe("Validate username", () => {

    beforeEach((done: Mocha.Done) => {
        service = new LoginService(databaseService);
        done();
    });

    it("should return false with an empty user name", (done: Mocha.Done) => {
        const result: boolean = service.validateUsername("");
        expect(result).to.equal(false);
        done();
    });

    it("should return false with less than 3 chars", (done: Mocha.Done) => {
        const result: boolean = service.validateUsername("ab");
        expect(result).to.equal(false);
        done();
    });

    it("should return false with more than 20 chars", (done: Mocha.Done) => {
        const result: boolean = service.validateUsername("abcdefghijklmnopqrstuvwxyz");
        expect(result).to.equal(false);
        done();
    });

    it("should return true between 3 and 20 chars", (done: Mocha.Done) => {
        const result: boolean = service.validateUsername("Michel");
        expect(result).to.equal(true);
        done();
    });

    it("should return false using special chars", (done: Mocha.Done) => {
        const result: boolean = service.validateUsername("Hello!");
        expect(result).to.equal(false);
        done();
    });

    it("should connect the user if it is valid", (done: Mocha.Done) => {
        service.connectUser("Michel");
        service.isUsernameUnique("Michel");
        expect(service.isUsernameUnique("Michel")).to.equal(false);
        done();
    });

    it("should return false if name is already used", (done: Mocha.Done) => {
        service.connectUser("Michel");
        const result: boolean = service.validateUsername("Michel");
        expect(result).to.equal(false);
        done();
    });

    it("should disconnect user if it is connected", (done: Mocha.Done) => {
        service.connectUser("Michel");
        service.disconnect("Michel");
        expect(service.isUsernameUnique("Michel")).to.equal(true);
        done();
    });
});
