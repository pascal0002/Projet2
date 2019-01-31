import { Observable } from "rxjs";
import { instance, mock, when } from "ts-mockito";
import { UserLoginService } from "./user-login.service";
import { WebsocketService } from "./websocket.service";

let service: UserLoginService;
let mockWebsocketService: WebsocketService;
let mockWebsocketServiceInstance: WebsocketService;

describe("UserLoginService", () => {

  beforeEach(() => {
    mockWebsocketService = mock(WebsocketService);
  });

  it("should listen for username validation", () => {
    const mockObservable: Observable<boolean> = new Observable((observer) => observer.next(true));

    when(mockWebsocketService.listenForUsernameValidation()).thenReturn(mockObservable);

    mockWebsocketServiceInstance = instance(mockWebsocketService);
    service = new UserLoginService(mockWebsocketServiceInstance);

    const obs: Observable<boolean> = service.validateUsername("Pascale");

    expect(obs).toEqual(mockObservable);
  });

});
