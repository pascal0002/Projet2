// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { FormValidatorService } from "./form-validator.service";

let formValidatorService: FormValidatorService;

describe("form-validator-service", () => {

    beforeEach( () => {
        formValidatorService = new FormValidatorService();
    });

    describe("validateGameName", () => {

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

    describe("validateImageDimensions", () => {
        it("should return true if dimensions are 480 x 640", (done: Function) => {
            expect(formValidatorService.validateImageDimensions(480, 640)).equal(true);
            done();
        });

        it("should return false if dimensions are 480 x 720", (done: Function) => {
            expect(formValidatorService.validateImageDimensions(480, 720)).equal(false);
            done();
        });

        it("should return false if dimensions are 348 x 640", (done: Function) => {
            expect(formValidatorService.validateImageDimensions(348, 640)).equal(false);
            done();
        });

        it("should return false if dimensions are 348 x 720", (done: Function) => {
            expect(formValidatorService.validateImageDimensions(348, 720)).equal(false);
            done();
        });

        it("should return false if dimensions are 768 x 1024", (done: Function) => {
            expect(formValidatorService.validateImageDimensions(768, 1024)).equal(false);
            done();
        });

        it("should return false if dimensions are 0 x 0", (done: Function) => {
            expect(formValidatorService.validateImageDimensions(0, 0)).equal(false);
            done();
        });
    });

    describe("validateBitDepth", () => {
        it("should return true if bit depth is 24", (done: Function) => {
            expect(formValidatorService.validateBitDepth(24)).equal(true);
            done();
        });

        it("should return false if bit depth is 16", (done: Function) => {
            expect(formValidatorService.validateBitDepth(16)).equal(false);
            done();
        });

        it("should return false if bit depth is 0", (done: Function) => {
            expect(formValidatorService.validateBitDepth(0)).equal(false);
            done();
        });

        it("should return false if bit depth is 1", (done: Function) => {
            expect(formValidatorService.validateBitDepth(1)).equal(false);
            done();
        });
    });

    describe("validateImageExtenstion", () => {
        it("should return true if extension is bmp", (done: Function) => {
            expect(formValidatorService.validateImageExtension("bmp")).equal(true);
            done();
        });

        it("should return false if extension is png", (done: Function) => {
            expect(formValidatorService.validateImageExtension("png")).equal(false);
            done();
        });

        it("should return false if extension is jpeg", (done: Function) => {
            expect(formValidatorService.validateImageExtension("jpeg")).equal(false);
            done();
        });

        it("should return false if no extension is specified", (done: Function) => {
            expect(formValidatorService.validateImageExtension("")).equal(false);
            done();
        });
    });
});
