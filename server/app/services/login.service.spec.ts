// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import * as sinonts from "ts-sinon";
import { LoginService } from "./login.service";

let service: LoginService;
let databaseServiceStub: sinon.SinonStub;
class MockDatabaseService {

    public constructor() {
        this.connect();
    }

    private connect(): void {
        return;
    }

    public async getAll(model: mongoose.Model<mongoose.Document>): Promise<number> {
        return Promise.resolve(0);
    }

    public add(item: mongoose.Document): void {
        return;
    }

    public remove(model: mongoose.Model<mongoose.Document>, condition: Object): void {
        return;
    }

    public async countDocuments(model: mongoose.Model<mongoose.Document>, condition: Object): Promise<number> {
        return Promise.resolve(0);
    }
}

const databaseService: any = new MockDatabaseService();

describe("loginService", () => {

    describe("Connect user", () => {

        beforeEach((done: Mocha.Done) => {
            service = new LoginService(databaseService);
            done();
        });

        it("should call add from database service if the username is valid ", (done: Mocha.Done) => {
            const serviceStub: any = sinonts.stubObject(service, ["validateUsername"]);
            serviceStub.validateUsername.returns(true);

            serviceStub.connectUser("test");

            expect(databaseService.calledOnce);
            done();
        });

        it("should not call add from database service if the username is not valid ", (done: Mocha.Done) => {
            const serviceStub: any = sinonts.stubObject(service, ["validateUsername"]);
            serviceStub.validateUsername.returns(false);

            serviceStub.connectUser("test");

            expect(databaseService.notCalled);
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
            service = new LoginService(databaseService);
            done();
        });

        it("should call remove from database service", (done: Mocha.Done) => {
            service.disconnect("test");

            expect(databaseService.calledOnce);
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

        it("should return 0 if countDocument return 0", (done: Mocha.Done) => {
            databaseServiceStub.resolves(0);
            service.countUsernameOccurence("test")
            .then((occurence: number) => {
                expect(occurence).to.equal(0);
            })
            .catch((err: Error) => console.error(err));
            done();
        });

        it("should return 1 if countDocument return 1", (done: Mocha.Done) => {
            databaseServiceStub.resolves(1);
            service.countUsernameOccurence("test")
            .then((occurence: number) => {
                expect(occurence).to.equal(1);
            })
            .catch((err: Error) => console.error(err));
            done();
        });
    });
});
