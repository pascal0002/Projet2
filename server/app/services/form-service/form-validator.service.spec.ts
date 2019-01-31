// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { FormValidatorService } from "./form-validator.service";

let formValidatorService: FormValidatorService;

describe("form-validator-service", () => {

    describe("validateGameName", () => {

        beforeEach( () => {
            formValidatorService = new FormValidatorService();
        });

        it("should return true if length is 3", (done: Function) => {
            expect(formValidatorService.validateGameName("bob")).equal(true);
            done();
        });

        it("should return true if length is 15", (done: Function) => {
            expect(formValidatorService.validateGameName("123456789abcdef")).equal(true);
            done();
        });

        it("should return true if length is 6", (done: Function) => {
            expect(formValidatorService.validateGameName("Thomas")).equal(true);
            done();
        });

        it("should return false if length is 0", (done: Function) => {
            expect(formValidatorService.validateGameName("")).equal(false);
            done();
        });

        it("should return false if length is 2", (done: Function) => {
            expect(formValidatorService.validateGameName("Jo")).equal(false);
            done();
        });

        it("should return false if length is 16", (done: Function) => {
            expect(formValidatorService.validateGameName("123456789abcdefg")).equal(false);
            done();
        });

    });

    /*describe("validateImage", () => {

    });

    describe("validateImageDimensions", () => {

    });

    describe("validateBitDepth", () => {

    });

    describe("validateImageExtenstion", () => {

    });*/
});
