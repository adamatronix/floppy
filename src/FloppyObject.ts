import * as THREE from 'three';

interface LooseObject {
  [key: string]: any
}

class FloppyObject { 
  mesh: THREE.Mesh;

  constructor(boxDimensions: LooseObject) {
    this.createShape(boxDimensions);
  }

  createShape = (boxDimensions: LooseObject) => {
    const cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
    this.mesh = new THREE.Mesh(cubeGeo, cubeMat);
    this.mesh.position.set(0, 0, 0);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
}

export default FloppyObject;