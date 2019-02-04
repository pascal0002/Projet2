import { expect } from "chai";
import { DatabaseService } from "./database.service";
import { UsernameService } from "./username.service";

let usernameService: UsernameService;
const databaseService: DatabaseService = new DatabaseService();

describe("username-service", () => {
    describe("getAll", () => {

        beforeEach((done: Mocha.Done) => {
            usernameService = new UsernameService(databaseService);
            done();
        });

        it("template", (done: Mocha.Done) => {
            usernameService.getAllUsername();
            expect("something").to.equal("something");
            done();
        });
    });
});
