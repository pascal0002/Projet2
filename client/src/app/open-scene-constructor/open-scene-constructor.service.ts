import {Injectable} from "@angular/core";
import * as THREE from "three";
import {ClientConstants} from "../../../../common/communication/Constants";

@Injectable({
  providedIn: "root",
})
export class OpenSceneConstructorService {

  public constructor() {/**/}

  public makeObjects(scene: THREE.Scene): void {

    const numberOfObjects: number = Math.round(this.getRandomNumber() * (ClientConstants.MAX_OBJECTS_NB - ClientConstants.MIN_OBJECTS_NB))
    + ClientConstants.MIN_OBJECTS_NB;

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

    return new THREE.MeshStandardMaterial( {color: color, metalness: 0.1} );
  }

  private createObject(material: THREE.MeshStandardMaterial): THREE.Mesh {
    const referenceSize: number = 12;
    const objectDiameter: number = (this.getRandomNumber() + ClientConstants.HALF_VALUE) * referenceSize;
    const objectHeight: number = (this.getRandomNumber() + ClientConstants.HALF_VALUE) * referenceSize;
    const objectToChoose: number = Math.floor(this.getRandomNumber() * ClientConstants.OBJECT_TYPES_NB);
    const geometry: THREE.Geometry = this.chooseObject(objectDiameter, objectHeight, objectToChoose);

    return new THREE.Mesh(geometry, material);
  }

  private chooseObject(diameter: number, height: number, choice: number): THREE.Geometry {
    let geometry: THREE.Geometry;
    switch (choice) {
        case ClientConstants.SPHERE:
          geometry = new THREE.SphereGeometry(diameter * ClientConstants.HALF_VALUE,
                                              ClientConstants.RADIAL_PRECISION, ClientConstants.RADIAL_PRECISION);
          break;
        case ClientConstants.CUBE:
          geometry = new THREE.BoxGeometry(diameter, diameter, diameter);
          break;
        case ClientConstants.CYLINDER:
          geometry = new THREE.CylinderGeometry(diameter * ClientConstants.HALF_VALUE, diameter * ClientConstants.HALF_VALUE,
                                                height, ClientConstants.RADIAL_PRECISION);
          break;
        case ClientConstants.CONE:
          geometry = new THREE.ConeGeometry(diameter * ClientConstants.HALF_VALUE, height, ClientConstants.RADIAL_PRECISION);
          break;
        case ClientConstants.PYRAMID:
          geometry = new THREE.ConeGeometry(diameter * ClientConstants.HALF_VALUE, height, ClientConstants.PYRAMID_BASE_SIDES_NB);
          break;
        default:
          geometry = new THREE.ConeGeometry(diameter * ClientConstants.HALF_VALUE, height, ClientConstants.PYRAMID_BASE_SIDES_NB);
    }

    return geometry;
  }

  private translateObject(object: THREE.Mesh): void {
    const xPosition: number = Math.round(this.getRandomNumber() * ClientConstants.X_OBJECT_DISPERSION)
                              - ClientConstants.X_OBJECT_DISPERSION * ClientConstants.HALF_VALUE;
    const yPosition: number = Math.round(this.getRandomNumber() * ClientConstants.Y_OBJECT_DISPERSION)
                              - ClientConstants.Y_OBJECT_DISPERSION * ClientConstants.HALF_VALUE;
    const zPosition: number = Math.round(this.getRandomNumber() * ClientConstants.Z_OBJECT_DISPERSION)
                              - ClientConstants.Z_OBJECT_DISPERSION * ClientConstants.HALF_VALUE;

    object.position.set(xPosition, yPosition, zPosition);
  }

  private rotateObject(object: THREE.Mesh): void {
    object.rotateX(this.getRandomNumber() * ClientConstants.CIRCLE_DEGREES_NB);
    object.rotateY(this.getRandomNumber() * ClientConstants.CIRCLE_DEGREES_NB);
    object.rotateZ(this.getRandomNumber() * ClientConstants.CIRCLE_DEGREES_NB);
  }

  private addLighting(scene: THREE.Scene): void {
    const light: THREE.AmbientLight
    = new THREE.AmbientLight(ClientConstants.AMBIENT_LIGHT_COLOR, ClientConstants.AMBIENT_LIGHT_INTENSITY);
    const directionalLight: THREE.DirectionalLight
    = new THREE.DirectionalLight(ClientConstants.DIRECTIONAL_LIGHT_COLOR, ClientConstants.DIRECTIONAL_LIGHT_INTENSITY);

    scene.add(light);
    scene.add(directionalLight);
  }

  private getRandomNumber(): number {
    return Math.random();
  }
}
