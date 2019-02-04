import * as chai from "chai";
import * as spies from "chai-spies";
import * as express from "express";
import * as http from "http";
import { mock } from "ts-mockito";
import { LoginService } from "./login.service";
import { WebsocketService } from "./websocket.service";

let mockLoginService: LoginService;
let service: WebsocketService;
let fakeServer: http.Server;

describe("socket.io mock", () => {

    beforeEach((done: Mocha.Done) => {
        mockLoginService = mock(LoginService);
        service = new WebsocketService(mockLoginService);
        fakeServer = new http.Server(express);
        chai.use(spies);
        done();
    });

    it("should init the socket server correctly", (done: Mocha.Done) => {
        service.init(fakeServer);

        // tslint:disable-next-line:no-unused-expression
        chai.expect(service.socket, "SocketIO was not properly created !").to.exist;
        done();
    });

    it("should bind the events correctly", (done: Mocha.Done) => {
        service.init(fakeServer);

        // tslint:disable-next-line:typedef
        const spy = chai.spy.on(service.socket, "on");

        service.socket.emit("connection", service.socket);

        chai.expect(spy, "SocketIO connection event failed !").to.have.been.called();
        done();
    });

});
