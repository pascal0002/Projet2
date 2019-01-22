import { Container } from "inversify";
import { Application } from "./app";
import { DateController } from "./controllers/date.controller";
import { IndexController } from "./controllers/index.controller";
import { LoginController } from "./controllers/login.controller";
import { Server } from "./server";
import { DateService } from "./services/date.service";
import { IndexService } from "./services/index.service";
import { LoginService } from "./services/login.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.IndexController).to(IndexController);
container.bind(Types.IndexService).to(IndexService);

container.bind(Types.DateController).to(DateController);
container.bind(Types.DateService).to(DateService);

container.bind(Types.LoginController).to(LoginController);
container.bind(Types.LoginService).to(LoginService);

export { container };
