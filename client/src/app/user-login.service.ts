import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class UserLoginService {
  private readonly BASE_URL: string = "http://localhost:3000/";
  public constructor(private http: HttpClient) {}

  public validateUsername(username: string): Observable<boolean> {
    return this.http.post<boolean>(this.BASE_URL, username).pipe(
      // tslint:disable-next-line:trailing-comma
      catchError(this.handleError<boolean>("error"))
    );
  }

  private handleError<T>(
    request: string,
    result?: T,
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
