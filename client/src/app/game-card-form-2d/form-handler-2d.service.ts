import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormHandler2dService {

  public openForm(): void {

    let form2D = document.getElementById("formWindow");
    let pageMask = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "block";
      pageMask.style.display="block";
    }
  }

  public closeForm(): void {
    let form2D = document.getElementById("formWindow");
    let pageMask = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "none";
      pageMask.style.display="none";
    }
  }

  public constructor() { }
}
