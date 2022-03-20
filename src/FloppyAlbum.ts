import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AlbumShape from 'url:./assets/floppy.glb';

class FloppyAlbum { 
  mesh: THREE.Mesh;
  callback: Function;

  constructor(image: string, scale: number) {
    this.createShape(image, scale);
  }

  createShape = (image: string, scale: number) => {
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
          (<THREE.Mesh> o).position.set( 0, 0, 0);
          (<THREE.Mesh> o).castShadow = true;
          (<THREE.Mesh> o).receiveShadow = true;
          self.mesh = (<THREE.Mesh> o);
          self.mesh.scale.set( scale, scale, scale );
          
        }
      });

      if(self.callback) {
        self.callback(gltf.scene);
      }
      
    } );
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

export default FloppyAlbum;