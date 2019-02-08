import { Injectable } from "@angular/core";
import * as THREE from "three";
import {ClientConstants} from "../../../../common/communication/Constants";

@Injectable({
  providedIn: "root",
})
export class OpenSceneConstructorService {

  public constructor() {/**/}

  public makeObjects(scene: THREE.Scene): void {

    const numberOfObjects: number = 1; // Math.round(this.getRandomNumber() * 190) + 10;

    for (let i: number = 0; i < numberOfObjects; i++) {
      const material: THREE.MeshStandardMaterial = this.makeRandomColors();
      const object: THREE.Mesh = this.createObject(material);
      this.translateObject(object);
      this.rotateObject(object);
      scene.add(object);
    }
    this.addLighting(scene);
  }

  private makeRandomColors(): THREE.MeshStandardMaterial {

    const red: number = Math.round(this.getRandomNumber() * ClientConstants.COLOR_PARAMETER_MAX_VALUE);
    const green: number = Math.round(this.getRandomNumber() * ClientConstants.COLOR_PARAMETER_MAX_VALUE);
    const blue: number = Math.round(this.getRandomNumber() * ClientConstants.COLOR_PARAMETER_MAX_VALUE);
    const colorsGenerated: string = "rgb(" + red + "," + green + "," + blue + ")";
    const color: THREE.Color = new THREE.Color(colorsGenerated);

    return new THREE.MeshStandardMaterial( {color: color, metalness: 0.4, roughness: 0.5} );
  }

  private createObject(material: THREE.MeshStandardMaterial): THREE.Mesh {

    const referenceSize: number = 12;
    const objectSize: number = (this.getRandomNumber() + 0.5) * referenceSize;
    const objectToChoose: number = 2; // Math.floor(this.getRandomNumber() * 5);
    let geometry: THREE.Geometry;

    switch (objectToChoose) {
        case 0:
        geometry = new THREE.SphereGeometry(objectSize / 2, 15, 15);
        break;
        case 1:
        geometry = new THREE.BoxGeometry(objectSize, objectSize, objectSize);
        break;
        // je suis rendu ici
        case 2:
        geometry = new THREE.ConeGeometry(objectSize, objectSize, 20);
        break;
        case 3:
        geometry = new THREE.CylinderGeometry(objectSize, objectSize, objectSize, 20);
        break;
        case 4:
        geometry = new THREE.ConeGeometry(objectSize, objectSize, 3);
        break;
        default:
        geometry = new THREE.ConeGeometry(objectSize, objectSize, 3);
    }

    return new THREE.Mesh(geometry, material);
  }

  private translateObject(object: THREE.Mesh): void {
    const xPosition: number = Math.round(this.getRandomNumber() * 180) - 90;
    const yPosition: number = Math.round(this.getRandomNumber() * 80) - 40;
    const zPosition: number = Math.round(this.getRandomNumber() * 60) - 30;
    object.position.set(xPosition, yPosition, zPosition);
  }

  private rotateObject(object: THREE.Mesh): void {
    object.rotateX(this.getRandomNumber() * ClientConstants.CIRCLE_DEGREES_NB);
    object.rotateY(this.getRandomNumber() * ClientConstants.CIRCLE_DEGREES_NB);
    object.rotateZ(this.getRandomNumber() * ClientConstants.CIRCLE_DEGREES_NB);
  }

  private addLighting(scene: THREE.Scene): void {
    const light: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(light);
    const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0x333333, 5);
    scene.add(directionalLight);
  }

  private getRandomNumber(): number {
    return Math.random();
  }
}
