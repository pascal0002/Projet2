import Axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { IMessage } from "../../../common/communication/message";

@injectable()
export class IndexService {
    public about(): IMessage {
        return {
            title: "This is merely a test",
            body: "Lorem ipsum........",
        };
    }

    public async helloWorld(): Promise<IMessage> {
        return Axios.get<IMessage>("http://localhost:3000/api/date").then((timeMessage: AxiosResponse<IMessage>) => {
            return {
                title: "Hello world",
                body: "Time is " + timeMessage.data.body,
            };
        // tslint:disable-next-line:no-any
        }).catch((error: any) => {
            console.error("There was an error!!!", error);

            return {
                title: "Error",
                body: error.toString(),
            };
        });
    }
}
