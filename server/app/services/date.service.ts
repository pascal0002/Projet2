import Axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { IMessage } from "../../../common/communication/message";
import { IDate } from "./IDate";

@injectable()
export class DateService {

    public async currentTime(): Promise<IMessage> {
        const apiResponse: AxiosResponse = await Axios.get<IDate>(`http://worldclockapi.com/api/json/est/now`);

        return {
            title: "Time",
            body: apiResponse.data.currentDateTime.toString(),
        };
    }
}
