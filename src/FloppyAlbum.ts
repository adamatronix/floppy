import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AlbumShape from './assets/floppy.glb';

class FloppyAlbum { 
  mesh: THREE.Mesh;
  callback: Function;

  constructor(image: string, callback: Function) {
    this.callback = callback;
    this.createShape(image);
  }

  createShape = (image: string) => {
    const self = this;
    const loader = new GLTFLoader();
    const texture = new THREE.TextureLoader().load(image);
    texture.flipY = false;
    const textureMat = new THREE.MeshPhongMaterial( { map: texture } );
    loader.load(AlbumShape, function ( gltf ) {
      gltf.scene.traverse((o) => {
        if ((<THREE.Mesh> o).isMesh) {
          (<THREE.Mesh> o).material = textureMat;
          (<THREE.Mesh> o).rotation.x = Math.PI * .5;
          (<THREE.Mesh> o).rotation.z = Math.PI * 1;
          (<THREE.Mesh> o).position.set( 0, 10, 0);
          (<THREE.Mesh> o).castShadow = true;
          (<THREE.Mesh> o).receiveShadow = true;
          self.mesh = (<THREE.Mesh> o);
        }
      });

      self.callback(gltf.scene);
    } );
  }
}

export default FloppyAlbum;