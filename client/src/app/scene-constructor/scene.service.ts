import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as THREE from "three";
import {ClientConstants} from "../../../../common/communication/Constants";
import {IThreeObject} from "../../../../common/communication/ThreeObject";

@Injectable({
  providedIn: "root",
})
export class SceneService {

  public strDownloadMime: string = "image/octet-stream";

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public glRenderer: THREE.WebGLRenderer;

  public constructor(private http: HttpClient) {/**/}

  public createOriginalCanvas(canvas: HTMLCanvasElement): void {
    this.makeScene(canvas);
    this.addLighting();
    this.createObjects();
  }

  private makeScene(canvas: HTMLCanvasElement): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("skyblue");
    this.camera = new THREE.PerspectiveCamera(ClientConstants.CAMERA_FIELD_OF_VIEW, canvas.clientWidth / canvas.clientHeight,
                                              1, ClientConstants.CAMERA_RENDER_DISTANCE);
    this.camera.position.z = ClientConstants.Z_CAMERA_POSITION;
    this.glRenderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, preserveDrawingBuffer: true});
  }

  private createObjects(): void {

    this.http.get<IThreeObject[]>(`${ClientConstants.SERVER_BASE_URL}api/scene/objects`)
    .toPromise()
    .then((objects) => {this.generateObjects(objects); }, )
    .then(() => {this.saveAsImage(); }, )
    .catch((error: Error) => {console.error(error.message);
    });
  }

  private generateObjects(objects: IThreeObject[]): void {

    for (const object of objects) {
      const threeObject: THREE.Mesh = this.createBasicObject(object);
      this.translateObject(threeObject, object);
      this.rotateObject(threeObject, object);
      this.scene.add(threeObject);
    }
  }

  private addLighting(): void {
    const light: THREE.AmbientLight
    = new THREE.AmbientLight(ClientConstants.AMBIENT_LIGHT_COLOR, ClientConstants.AMBIENT_LIGHT_INTENSITY);
    const directionalLight: THREE.DirectionalLight
    = new THREE.DirectionalLight(ClientConstants.DIRECTIONAL_LIGHT_COLOR, ClientConstants.DIRECTIONAL_LIGHT_INTENSITY);

    this.scene.add(light);
    this.scene.add(directionalLight);
  }

  public render(canvas: HTMLCanvasElement): void {
    this.glRenderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => {
      this.render(canvas);
    });
    this.glRenderer.render(this.scene, this.camera);
  }

  private createBasicObject(object: IThreeObject): THREE.Mesh {
    const material: THREE.MeshStandardMaterial = this.makeRandomColors(object);
    const geometry: THREE.Geometry = this.chooseObject(object.diameter, object.height, object.type);

    return new THREE.Mesh(geometry, material);
  }

  private makeRandomColors(object: IThreeObject): THREE.MeshStandardMaterial {
    const color: THREE.Color = new THREE.Color(object.color);

    return new THREE.MeshStandardMaterial( {color: color, metalness: 0.1} );
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

  private translateObject(threeObject: THREE.Mesh, object: IThreeObject): void {
    threeObject.position.set(object.position[0], object.position[1], object.position[1 + 1]);
  }

  private rotateObject(threeObject: THREE.Mesh, object: IThreeObject): void {
    threeObject.rotateX(object.orientation[0]);
    threeObject.rotateY(object.orientation[1]);
    threeObject.rotateZ(object.orientation[1 + 1]);
  }

  public saveAsImage(): void {
    const imgData: string = this.glRenderer.domElement.toDataURL("image/jpeg");
    this.http.post(`${ClientConstants.SERVER_BASE_URL}api/scene/gameCard3D`, imgData)
    .toPromise()
    .catch((error: Error) => {console.error(error.message); });
  }
}
