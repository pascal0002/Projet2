// tslint:disable:no-magic-numbers
import { expect } from "chai";
import {Mockgoose} from "mockgoose";
import * as mongoose from "mongoose";
import "reflect-metadata";
import * as sinon from "sinon";
import { DatabaseService } from "./database.service";

let databaseService: DatabaseService;
let mockgoose: Mockgoose;
const testSchema: mongoose.Schema = new mongoose.Schema({
    test: String,
});
let test: mongoose.Model<mongoose.Document>;

describe("DatabaseService", () => {
    beforeEach(() => {
        databaseService = new DatabaseService();
        mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(() => {
            mongoose.connect("mongodb://example.com/TestingDB", { useNewUrlParser: true })
            .catch((err: Error) => console.error(err));
        });
        test = mongoose.model("test", testSchema, "tests");
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
