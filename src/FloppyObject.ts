import * as THREE from 'three';

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

  createShape = (boxDimensions: LooseObject) => {
    const texture = new THREE.TextureLoader().load(this.image);
    // Create an array of materials to be used in a cube, one for each side
    const cubeMaterialArray = [];

    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xACD2DD } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xACD2DD } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xACD2DD } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xACD2DD } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xACD2DD } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture } ) );

    const cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#ACD2DD'});
    this.mesh = new THREE.Mesh(cubeGeo, cubeMaterialArray);
    this.mesh.position.set(0, 0, 0);

    this.mesh.rotation.x = Math.PI * .5;
    this.mesh.rotation.z = Math.PI * 1;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
}

export default FloppyObject;