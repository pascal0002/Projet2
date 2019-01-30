import { assert, expect } from "chai";

const TWO: number = 2;
const FOUR: number = 4;
const HUNDRED: number = 100;
const TWOHUNDRED: number = 200;
const THOUSAND: number = 1000;

function getPromise(): Promise<{}> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hi");
        },         THOUSAND);
    });
}

function* promiseGenerator(): IterableIterator<Promise<{}>> {
    for (;;) {
        yield new Promise((res, rej) => {
            res(Math.random() * HUNDRED);
        });
    }
}

beforeEach((d: Mocha.Done) => {
    // tslint:disable-next-line:no-console
    console.log(`Waiting for the before each`);
    setTimeout(() => {
        // tslint:disable-next-line:no-console
        console.log(`Resolved the beforeEach`);
        d();
    },         TWOHUNDRED);
});

beforeEach("Await generator", async () => {
    const a: {} = await promiseGenerator().next().value;
    // tslint:disable-next-line:no-console
    console.log(`Got ${a}`);

    return a;
});

beforeEach(() => {
    // tslint:disable-next-line:no-console
    console.log("================");
});

it("should complete a 100% sure test with done called", (done: Function) => {
    assert.ok(true);
    done();
});

it("should complete an async test by returning a promise and NOT SPECIFYING A DONE FUNCTION", async () => {
   return getPromise().then((v: {}) => {
       // tslint:disable-next-line:no-console
       console.log(`Got ${v} from promise`);
       expect(v).to.be.of.length.at.least(TWO, "message from getPromise should be at least 2 of length");
       expect(v).not.to.be.of.length.at.least(FOUR, "message from getPromise should have a length smaller than 4");
   });
});

// If a parameter (done) is passed to `it`, we MUST call it and NOT RETURN a Promise
it("should complete the ", (done: Mocha.Done) => {
    getPromise().then((v: {}) => {
        // tslint:disable-next-line:no-console
        console.log(`Got ${v} from promise`);
        done();
    });
 });

it("a rejected promise will not fail", () => {
    Promise.reject("Simply to test a wrong value");
 });
