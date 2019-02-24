// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as mongoose from "mongoose";
import "reflect-metadata";
import * as sinon from "sinon";
import { test } from "../../mock/test-schema";
import { DatabaseService } from "./database.service";

let databaseService: DatabaseService;

describe("DatabaseService", () => {
    before((done: Mocha.Done) => {
        databaseService = new DatabaseService();
        done();
    });

    after((done: Mocha.Done) => {
        mongoose.connection.close()
        .catch((err: Error) => console.error(err));
        done();
    });

    it("getAll, find function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "find");
        databaseService.getAll(test)
        .catch((err: Error) => console.error(err));

        expect(modelStub.calledOnce);

        modelStub.restore();
        done();
    });

    it("add, save function is call once ", (done: Mocha.Done) => {
        const document: mongoose.Document = new test();
        const documentStub: sinon.SinonStub = sinon.stub(document, "save").resolves();
        databaseService.add(document);

        expect(documentStub.calledOnce);

        documentStub.restore();
        done();
    });

    it("remove, deleteOne function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "deleteOne");
        modelStub.resolves();
        databaseService.remove(test, {});

        expect(modelStub.calledOnce);

        modelStub.restore();
        done();
    });

    it("countDocuments, countDocuments function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "countDocuments");
        databaseService.countDocuments(test, {})
        .catch((err: Error) => console.error(err));

        expect(modelStub.calledOnce);

        modelStub.restore();
        done();
    });

    it("updateOne, findOneAndUpdate function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "findOneAndUpdate");
        databaseService.updateOne(test, {}, {})
        .catch((err: Error) => console.error(err));

        expect(modelStub.calledOnce);

        modelStub.restore();
        done();
    });

    it("getOne, findOne function is call once ", (done: Mocha.Done) => {
        const modelStub: sinon.SinonStub = sinon.stub(test, "findOne");
        databaseService.getOne(test, {})
        .catch((err: Error) => console.error(err));

        expect(modelStub.calledOnce);

        modelStub.restore();
        done();
    });

});
