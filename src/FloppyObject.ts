import * as THREE from 'three';
import { gsap } from "gsap";

interface LooseObject {
  [key: string]: any
}

class FloppyObject { 
  mesh: THREE.Mesh;
  image: any;

  constructor(boxDimensions: LooseObject, image: any) {
    this.image = image;
    this.createShape(boxDimensions,image);
  }

  buildMaterial = (asset:any, callback: any) => {
    let cubeMaterialArray;
    if(asset instanceof THREE.Texture) {
      cubeMaterialArray = this.getMaterialArray(asset);
      if(callback)
        callback(cubeMaterialArray);
    } else {
      new THREE.TextureLoader().load(asset, (texture) => {

        cubeMaterialArray = this.getMaterialArray(texture);
        if(callback)
          callback(cubeMaterialArray);
      });    
    }

    
  }

  getMaterialArray = (texture:THREE.Texture) => {
    // Create an array of materials to be used in a cube, one for each side
    const cubeMaterialArray = [];
      
    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF  } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture, transparent: true  } ) );

    return cubeMaterialArray;
  }

  updateMaterial = (image: any, width: number, height: number) => {
    this.image = image;

    const ratio = height / width;
    this.buildMaterial(image, (mat:any)=> {
      this.mesh.material = mat;
      this.mesh.scale.y = this.mesh.scale.x * ratio;
    });
  }

  createShape = (boxDimensions: LooseObject, image:any) => {

    const cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
    this.mesh = new THREE.Mesh(cubeGeo, null);
    this.mesh.position.set(0, 0, 0);

    this.mesh.rotation.x = Math.PI * .5;
    this.mesh.rotation.z = Math.PI * 1;

    this.buildMaterial(image, (mat:any)=> {
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