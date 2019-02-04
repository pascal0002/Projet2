import { expect } from "chai";
import { UsernameService } from "./username.service";

let service: UsernameService;

describe("username-service", () => {
    describe("getAll", () => {

        beforeEach((done: Mocha.Done) => {
            service = new UsernameService();
            done();
        });

        it("template", (done: Mocha.Done) => {
            service.getAll();
            expect("something").to.equal("something");
            done();
        });
    });
});
