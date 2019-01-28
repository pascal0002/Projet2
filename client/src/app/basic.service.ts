import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { IMessage } from "../../../common/communication/message";

@Injectable()
export class BasicService {

    private readonly BASE_URL: string = "http://localhost:3000/";
    public constructor(private http: HttpClient) { }

    public basicGet(): Observable<IMessage> {

        return this.http.get<IMessage>(this.BASE_URL).pipe(
            catchError(this.handleError<IMessage>("basicGet")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
