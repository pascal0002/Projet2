import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Constants } from "../../../../common/communication/Constants";
import { IThreeObject } from "../../../../common/communication/ThreeObject";

@Injectable({
  providedIn: "root",
})
export class Game3dGeneratorService {

  public constructor(private http: HttpClient) { }

  public generateGame(originalScene: THREE.Scene, modifiedScene: THREE.Scene, title: string): void {
    this.http.post<IThreeObject[][]>(Constants.SERVER_BASE_URL + Constants.API + Constants.SCENE_URL, { title: title }).toPromise()
      .then(
        (scenes) => {
          this.generateObjects(scenes[0], originalScene);
          this.generateObjects(scenes[1], modifiedScene);
        },
      )
      .catch(
        (err) => { console.error("erreur :", err); },
      );
  }

  public generateObjects(objects: IThreeObject[], currentScene: THREE.Scene): void {
    for (const object of objects) {
      const threeObject: THREE.Mesh = this.createBasicObject(object);
      this.translateObject(threeObject, object);
      this.rotateObject(threeObject, object);
      currentScene.add(threeObject);
    }
  }

  private createBasicObject(object: IThreeObject): THREE.Mesh {
    const material: THREE.MeshStandardMaterial = this.makeColors(object);
    const geometry: THREE.Geometry = this.chooseObject(object.diameter, object.height, object.type);

    return new THREE.Mesh(geometry, material);
  }

  private makeColors(object: IThreeObject): THREE.MeshStandardMaterial {
    const color: THREE.Color = new THREE.Color(object.color);

    return new THREE.MeshStandardMaterial({ color: color});
  }

  private chooseObject(diameter: number, height: number, choice: number): THREE.Geometry {
    let geometry: THREE.Geometry;
    switch (choice) {
      case Constants.SPHERE:
        geometry = new THREE.SphereGeometry(diameter * Constants.HALF_VALUE, Constants.RADIAL_PRECISION, Constants.RADIAL_PRECISION);
        break;
      case Constants.CUBE:
        geometry = new THREE.BoxGeometry(diameter, diameter, diameter);
        break;
      case Constants.CYLINDER:
        geometry = new THREE.CylinderGeometry(diameter * Constants.HALF_VALUE, diameter * Constants.HALF_VALUE, height,
                                              Constants.RADIAL_PRECISION);
        break;
      case Constants.CONE:
        geometry = new THREE.ConeGeometry(diameter * Constants.HALF_VALUE, height, Constants.RADIAL_PRECISION);
        break;
      case Constants.PYRAMID:
        geometry = new THREE.ConeGeometry(diameter * Constants.HALF_VALUE, height, Constants.PYRAMID_BASE_SIDES_NB);
        break;
      default:
        geometry = new THREE.ConeGeometry(diameter * Constants.HALF_VALUE, height, Constants.PYRAMID_BASE_SIDES_NB);
    }

    return geometry;
  }

  private translateObject(threeObject: THREE.Mesh, object: IThreeObject): void {
    threeObject.position.set(object.position[0], object.position[1], object.position[1 + 1]);
  }

  private rotateObject(threeObject: THREE.Mesh, object: IThreeObject): void {
    threeObject.rotateX(object.orientation[0]);
    threeObject.rotateY(object.orientation[1]);
    threeObject.rotateZ(object.orientation[1 + 1]);
  }
}
