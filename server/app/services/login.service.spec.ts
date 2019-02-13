// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "sinon";
import * as sinonts from "ts-sinon";
import { DatabaseService } from "./database.service";
import { LoginService } from "./login.service";

let service: LoginService;
const databaseService: DatabaseService = new DatabaseService();
let databaseServiceStub: sinon.SinonStub;

describe("loginService", () => {

    describe("Connect user", () => {

        beforeEach((done: Mocha.Done) => {
            databaseServiceStub = sinon.stub(databaseService, "add");
            service = new LoginService(databaseService);
            done();
        });

        afterEach((done: Mocha.Done) => {
            databaseServiceStub.restore();
            done();
        });

        it("should call add from database service if the username is valid ", (done: Mocha.Done) => {
            const serviceStub: any = sinonts.stubObject(service, ["validateUsername"]);
            serviceStub.validateUsername.returns(true);

            serviceStub.connectUser("test");

            expect(databaseServiceStub.calledOnce);
            done();
        });

        it("should not call add from database service if the username is not valid ", (done: Mocha.Done) => {
            const serviceStub: any = sinonts.stubObject(service, ["validateUsername"]);
            serviceStub.validateUsername.returns(false);

            serviceStub.connectUser("test");

            expect(databaseServiceStub.notCalled);
            done();
        });
    });

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

    describe("Disconnect user", () => {

        beforeEach((done: Mocha.Done) => {
            databaseServiceStub = sinon.stub(databaseService, "remove");
            service = new LoginService(databaseService);
            done();
        });

        afterEach((done: Mocha.Done) => {
            databaseServiceStub.restore();
            done();
        });

        it("should call remove from database service", (done: Mocha.Done) => {
            service.disconnect("test");

            expect(databaseServiceStub.calledOnce);
            done();
        });
    });

    describe("Is username unique", () => {

        beforeEach((done: Mocha.Done) => {
            databaseServiceStub = sinon.stub(databaseService, "countDocuments");
            service = new LoginService(databaseService);
            done();
        });

        afterEach((done: Mocha.Done) => {
            databaseServiceStub.restore();
            done();
        });

        it("should return true if countDocument return 0", (done: Mocha.Done) => {
            databaseServiceStub.resolves(0);
            service.countUsernameOccurence("test")
            .then((occurence: number) => {
                expect(occurence).to.equal(0);
            })
            .catch((err: Error) => console.error(err));
            done();
        });

        it("should return true if countDocument return 1", (done: Mocha.Done) => {
            databaseServiceStub.resolves(1);
            service.countUsernameOccurence("test")
            .then((occurence: number) => {
                expect(occurence).to.equal(0);
            })
            .catch((err: Error) => console.error(err));
            done();
        });
    });
});
