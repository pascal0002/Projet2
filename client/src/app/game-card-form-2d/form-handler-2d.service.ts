import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormHandler2dService {

  public openForm(): void {

    const form2D = document.getElementById("formWindow");
    const pageMask = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "block";
      pageMask.style.display = "block";
    }
  }

  public closeForm(): void {
    const form2D = document.getElementById("formWindow");
    const pageMask = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "none";
      pageMask.style.display = "none";
    }
  }

  public constructor() {/**/}
}
