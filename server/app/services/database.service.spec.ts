// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as mongoose from "mongoose";
import "reflect-metadata";
import * as sinon from "sinon";
import { DatabaseService } from "./database.service";

let databaseService: DatabaseService;
const testSchema: mongoose.Schema = new mongoose.Schema({
    test: String,
});
const test: mongoose.Model<mongoose.Document> = mongoose.model("test", testSchema, "tests");

describe("DatabaseService", () => {
    beforeEach(() => {
        databaseService = new DatabaseService();
    });

    it("getAll, find function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "find");
        databaseService.getAll(test)
        .catch((err: Error) => console.error(err));

        expect(modelStub.calledOnce);

        done();
    });

    it("add, save function is call once ", (done: Mocha.Done) => {
        const document: mongoose.Document = new test();
        const documentStub: sinon.SinonStub = sinon.stub(document, "save").resolves();
        databaseService.add(document);

        expect(documentStub.calledOnce);

        done();
    });

    it("remove, deleteOne function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "deleteOne");
        databaseService.remove(test, {});

        expect(modelStub.calledOnce);

        done();
    });

    it("countDocuments, countDocuments function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "countDocuments");
        databaseService.countDocuments(test, {})
        .catch((err: Error) => console.error(err));

        expect(modelStub.calledOnce);

        done();
    });

});
