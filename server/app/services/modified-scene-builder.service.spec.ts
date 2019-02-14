// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
// import { ModifiedSceneBuilderService } from "./modified-scene-builder.service";

describe("snapshot-writer-service", () => {

    // let modifiedSceneBuilderService: ModifiedSceneBuilderService;

    const init: Mocha.Func = () => {
        // modifiedSceneBuilderService = new ModifiedSceneBuilderService();
    };

    describe("makeSnapshot", () => {
        beforeEach(init);

        it("description", (done: Mocha.Done) => {
            expect("something").deep.equal("something");
            done();
        });
    });
});
