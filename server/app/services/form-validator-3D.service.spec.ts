// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { IFormInfo3D } from "../../../common/communication/FormInfo3D";
import { FormValidator3DService } from "./form-validator-3D.service";

let formValidatorService: FormValidator3DService;

describe("form-validator-service-3D", () => {

    beforeEach( () => {
        formValidatorService = new FormValidator3DService();
    });

    it("should return false if the length of the game name is 0", (done: Function) => {
        expect(formValidatorService["validateGameName"]("")).equal(false);
        done();
    });

    it("should return true if the length of the game name is 3", (done: Function) => {
        expect(formValidatorService["validateGameName"]("bob")).equal(true);
        done();
    });

    it("should return true if the length of the game name is 9", (done: Function) => {
        expect(formValidatorService["validateGameName"]("bobinette")).equal(true);
        done();
    });

    it("should return true if the length of the game name is 15", (done: Function) => {
        expect(formValidatorService["validateGameName"]("bobinette000000")).equal(true);
        done();
    });

    it("should return false if the length of the game name is 20", (done: Function) => {
        expect(formValidatorService["validateGameName"]("abcdefghijklmnopqrst")).equal(false);
        done();
    });

    it("should return true if we choose any of the available themes", (done: Function) => {
        expect(formValidatorService["validateObjectType"]("Formes géométriques")).equal(true);
        expect(formValidatorService["validateObjectType"]("Forêt")).equal(true);
        expect(formValidatorService["validateObjectType"]("Océan")).equal(true);
        done();
    });

    it("should return false if we choose a theme that isn't available", (done: Function) => {
        expect(formValidatorService["validateObjectType"]("Fire")).equal(false);
        done();
    });

    it("should return false if we choose 0 objects", (done: Function) => {
        expect(formValidatorService["validateNumberOfObjects"](0)).equal(false);
        done();
    });

    it("should return true if we choose 10 objects", (done: Function) => {
        expect(formValidatorService["validateNumberOfObjects"](10)).equal(true);
        done();
    });

    it("should return true if we choose 99 objects", (done: Function) => {
        expect(formValidatorService["validateNumberOfObjects"](99)).equal(true);
        done();
    });

    it("should return true if we choose 200 objects", (done: Function) => {
        expect(formValidatorService["validateNumberOfObjects"](200)).equal(true);
        done();
    });

    it("should return true if we choose 201 objects", (done: Function) => {
        expect(formValidatorService["validateNumberOfObjects"](201)).equal(false);
        done();
    });

    it("should return true if 1 checkbox is checked", (done: Function) => {
        expect(formValidatorService["validateNumberOfCheckboxesChecked"](true, false, false))
        .equal(true);
        done();
    });

    it("should return true if 2 checkbox are checked", (done: Function) => {
        expect(formValidatorService["validateNumberOfCheckboxesChecked"](false, true, true))
        .equal(true);
        done();
    });

    it("should return true if 3 checkbox are checked", (done: Function) => {
        expect(formValidatorService["validateNumberOfCheckboxesChecked"](true, true, true))
        .equal(true);
        done();
    });

    it("should return false if no checkbox is checked", (done: Function) => {
        expect(formValidatorService["validateNumberOfCheckboxesChecked"](false, false, false))
        .equal(false);
        done();
    });

    it("should return true if the form is valid", (done: Function) => {
        const GOOD_FORM_3D: IFormInfo3D = {
            gameName: "GoodName",
            objectType: "Océan",
            numberOfObjects: 43,
            addObjects: true,
            modifyObjects: true,
            deleteObjects: true,
        };
        expect(formValidatorService.validateForm(GOOD_FORM_3D))
        .equal(true);
        done();
    });

    it("should return false if the form is invalid", (done: Function) => {
        const BAD_FORM_3D: IFormInfo3D = {
            gameName: "Verybadname00000",
            objectType: "Oops",
            numberOfObjects: 343,
            addObjects: false,
            modifyObjects: false,
            deleteObjects: false,
        };
        expect(formValidatorService.validateForm(BAD_FORM_3D))
        .equal(false);
        done();
    });
});
