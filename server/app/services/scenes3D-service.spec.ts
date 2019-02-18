// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { Scene3DService } from "./scenes3D-service";

let scenes3DService: Scene3DService;

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
let databaseServiceStub: sinon.SinonStub;

describe("game-cards-service", () => {

  describe("addScene3D", () => {

    beforeEach((done: Mocha.Done) => {
      scenes3DService = new Scene3DService(databaseService);
      databaseServiceStub = sinon.stub(databaseService, "add");
      done();
    });

    afterEach((done: Mocha.Done) => {
      databaseServiceStub.restore();
      done();
    });
  });

});