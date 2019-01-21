import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormHandler2dService {

  openForm(){
    let form = document.getElementById("formWindow");
    if(form){
      form.style.display="block";
    }
  }

  constructor() { }
}
