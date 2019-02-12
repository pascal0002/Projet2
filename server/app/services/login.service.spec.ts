import { expect } from "chai";
import * as sinon from "sinon";
// import * as sinonts from "ts-sinon";
import { DatabaseService } from "./database.service";
import { LoginService } from "./login.service";

let service: LoginService;
const databaseService: DatabaseService = new DatabaseService();
// let databaseServiceStub: sinon.SinonStubStatic;

describe("loginSrvice", () => {

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
    });

    describe("Is username unique", () => {

        beforeEach((done: Mocha.Done) => {
            sinon.stub(databaseService, "countDocuments").resolves(0);
            service = new LoginService(databaseService);
            done();
        });

        it("should return true if countDocuments return 0", (done: Mocha.Done) => {
            expect(service.isUsernameUnique("Michel")).to.equal(true);
            done();
        });

    // it("should return false if countDocuments return 1", (done: Mocha.Done) => {
    //     service.connectUser("Michel");
    //     service.isUsernameUnique("Michel");
    //     expect(service.isUsernameUnique("Michel")).to.equal(false);
    //     done();
    // });

    // it("should return false if name is already used", (done: Mocha.Done) => {
    //     service.connectUser("Michel");
    //     const result: boolean = service.validateUsername("Michel");
    //     expect(result).to.equal(false);
    //     done();
    // });

    // it("should disconnect user if it is connected", (done: Mocha.Done) => {
    //     service.connectUser("Michel");
    //     service.disconnect("Michel");
    //     expect(service.isUsernameUnique("Michel")).to.equal(true);
    //     done();
    // });
    });
});
