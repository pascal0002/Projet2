// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IFormInfo2D } from "../../../common/communication/FormInfo2D";
import { FormValidator2DService } from "./form-validator-2D.service";

let formValidatorService: FormValidator2DService;

const TEST_VALID_IMAGE: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "bmp", pixels: []};
let testInvalidImage: IBitmapImage = {height: 0, width: 0, bitDepth: 0, fileName: "", pixels: []};
let testFormInfo: IFormInfo2D = {gameName: "", originalImage: testInvalidImage, modifiedImage: testInvalidImage};

describe("form-validator-service-2D", () => {

    beforeEach( () => {
        formValidatorService = new FormValidator2DService();
    });

    describe("validateGameName", () => {

        it("should return true if length is 3", (done: Function) => {
            expect(formValidatorService["validateGameName"]("bob")).equal(true);
            done();
        });

        it("should return true if length is 15", (done: Function) => {
            expect(formValidatorService["validateGameName"]("123456789abcdef")).equal(true);
            done();
        });

        it("should return true if length is 6", (done: Function) => {
            expect(formValidatorService["validateGameName"]("Thomas")).equal(true);
            done();
        });

        it("should return false if length is 0", (done: Function) => {
            expect(formValidatorService["validateGameName"]("")).equal(false);
            done();
        });

        it("should return false if length is 2", (done: Function) => {
            expect(formValidatorService["validateGameName"]("Jo")).equal(false);
            done();
        });

        it("should return false if length is 16", (done: Function) => {
            expect(formValidatorService["validateGameName"]("123456789abcdefg")).equal(false);
            done();
        });

    });

    describe("validateImageDimensions", () => {
        it("should return true if dimensions are 480 x 640", (done: Function) => {
            expect(formValidatorService["validateImageDimensions"](480, 640)).equal(true);
            done();
        });

        it("should return false if dimensions are 480 x 720", (done: Function) => {
            expect(formValidatorService["validateImageDimensions"](480, 720)).equal(false);
            done();
        });

        it("should return false if dimensions are 348 x 640", (done: Function) => {
            expect(formValidatorService["validateImageDimensions"](348, 640)).equal(false);
            done();
        });

        it("should return false if dimensions are 348 x 720", (done: Function) => {
            expect(formValidatorService["validateImageDimensions"](348, 720)).equal(false);
            done();
        });

        it("should return false if dimensions are 768 x 1024", (done: Function) => {
            expect(formValidatorService["validateImageDimensions"](768, 1024)).equal(false);
            done();
        });

        it("should return false if dimensions are 0 x 0", (done: Function) => {
            expect(formValidatorService["validateImageDimensions"](0, 0)).equal(false);
            done();
        });
    });

    describe("validateBitDepth", () => {
        it("should return true if bit depth is 24", (done: Function) => {
            expect(formValidatorService["validateBitDepth"](24)).equal(true);
            done();
        });

        it("should return false if bit depth is 16", (done: Function) => {
            expect(formValidatorService["validateBitDepth"](16)).equal(false);
            done();
        });

        it("should return false if bit depth is 0", (done: Function) => {
            expect(formValidatorService["validateBitDepth"](0)).equal(false);
            done();
        });

        it("should return false if bit depth is 1", (done: Function) => {
            expect(formValidatorService["validateBitDepth"](1)).equal(false);
            done();
        });
    });

    describe("validateImageExtenstion", () => {
        it("should return true if extension is bmp", (done: Function) => {
            expect(formValidatorService["validateImageExtension"]("bmp")).equal(true);
            done();
        });

        it("should return false if extension is png", (done: Function) => {
            expect(formValidatorService["validateImageExtension"]("png")).equal(false);
            done();
        });

        it("should return false if extension is jpeg", (done: Function) => {
            expect(formValidatorService["validateImageExtension"]("jpeg")).equal(false);
            done();
        });

        it("should return false if no extension is specified", (done: Function) => {
            expect(formValidatorService["validateImageExtension"]("")).equal(false);
            done();
        });
    });

    describe("validateImage", () => {

        it("should return true if image has valid attributes", (done: Function) => {
            expect(formValidatorService["validateImage"](TEST_VALID_IMAGE)).equal(true);
            done();
        });

        it("should return false if image has invalid attributes", (done: Function) => {
            testInvalidImage = {height: 348, width: 720, bitDepth: 16, fileName: "png", pixels: []};
            expect(formValidatorService["validateImage"](testInvalidImage)).equal(false);
            done();
        });

        it("should return false if image has partially valid attributes (incorrect height and width)", (done: Function) => {
            testInvalidImage = {height: 348, width: 720, bitDepth: 24, fileName: "bmp", pixels: []};
            expect(formValidatorService["validateImage"](testInvalidImage)).equal(false);
            done();
        });

        it("should return false if image has partially valid attributes (incorrect extension)", (done: Function) => {
            testInvalidImage = {height: 480, width: 640, bitDepth: 24, fileName: "png", pixels: []};
            expect(formValidatorService["validateImage"](testInvalidImage)).equal(false);
            done();
        });

        it("should return false if image has partially valid attributes (incorrect bit depth)", (done: Function) => {
            testInvalidImage = {height: 480, width: 640, bitDepth: 16, fileName: "bmp", pixels: []};
            expect(formValidatorService["validateImage"](testInvalidImage)).equal(false);
            done();
        });
    });

    describe("validateForm", () => {

        it("should return true if formInfo has valid attributes", (done: Function) => {
            testFormInfo = {gameName: "Nature", originalImage: TEST_VALID_IMAGE, modifiedImage: TEST_VALID_IMAGE};
            expect(formValidatorService.validateForm(testFormInfo)).equal(true);
            done();
        });

        it("should return false if formInfo has invalid attributes (incorrect name)", (done: Function) => {
            testFormInfo = {gameName: "Jo", originalImage: TEST_VALID_IMAGE, modifiedImage: TEST_VALID_IMAGE};
            expect(formValidatorService.validateForm(testFormInfo)).equal(false);
            done();
        });

        it("should return false if formInfo has invalid attributes (invalid images)", (done: Function) => {
            testInvalidImage = {height: 348, width: 720, bitDepth: 24, fileName: "bmp", pixels: []};
            testFormInfo = {gameName: "Nature", originalImage: testInvalidImage, modifiedImage: testInvalidImage};
            expect(formValidatorService.validateForm(testFormInfo)).equal(false);
            done();
        });

        it("should return false if formInfo has invalid attributes (one invalid image)", (done: Function) => {
            testInvalidImage = {height: 348, width: 720, bitDepth: 16, fileName: "bmp", pixels: []} as IBitmapImage;
            testFormInfo = {gameName: "Nature", originalImage: TEST_VALID_IMAGE, modifiedImage: testInvalidImage};
            expect(formValidatorService.validateForm(testFormInfo)).equal(false);
            done();
        });
    });
});
