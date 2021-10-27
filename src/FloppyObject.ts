import * as THREE from 'three';
import { gsap } from "gsap";

interface LooseObject {
  [key: string]: any
}

class FloppyObject { 
  mesh: THREE.Mesh;
  image:string;

  constructor(boxDimensions: LooseObject, image: string) {
    this.image = image;
    this.createShape(boxDimensions);
  }

  buildMaterial = (callback: any) => {
    new THREE.TextureLoader().load(this.image, (texture) => {

      // Create an array of materials to be used in a cube, one for each side
      const cubeMaterialArray = [];

      // order to add materials: x+,x-,y+,y-,z+,z-
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture  } ) );
      callback(cubeMaterialArray);
    });    
  }

  updateMaterial = (image: string, width: number, height: number) => {
    this.image = image;

    const ratio = height / width;
    this.buildMaterial((mat:any)=> {
      this.mesh.material = mat;
      this.mesh.scale.y = this.mesh.scale.x * ratio;
    });
  }

  createShape = (boxDimensions: LooseObject) => {

    const cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
    this.mesh = new THREE.Mesh(cubeGeo, null);
    this.mesh.position.set(0, 0, 0);

    this.mesh.rotation.x = Math.PI * .5;
    this.mesh.rotation.z = Math.PI * 1;

    this.buildMaterial((mat:any)=> {
      this.mesh.material = mat;
    });
  }

  startRender = () => {
    // put rendering stuff here
  }

  stopRender = () => {
    // put stop rendering stuff here
  }

  needsUpdate = () => {

  }
}

export default FloppyObject;