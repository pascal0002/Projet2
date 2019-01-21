import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormHandler2dService {

  public openForm(): void {
    const form = document.getElementById("formWindow");
    if (form) {
      form.style.display = "block";
    }
  }

  public constructor() { }
}
