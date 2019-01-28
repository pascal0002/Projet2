import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DifferencesGeneratorService {

  constructor() { }

  generateDifferences(originalImg: File, modifiedImg: File) {
    alert("sup");
  }
}
