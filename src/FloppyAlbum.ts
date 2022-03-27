import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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


    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {

    }

    var TextureLoader = new THREE.TextureLoader(manager);
    TextureLoader.load(image, (texture) => {
      const albumtextureMat = new THREE.MeshPhongMaterial( { map: texture } );
      const texture2 = texture.clone();
      texture2.needsUpdate = true;
      texture2.repeat.set(1,0.05);
      texture2.flipY = false;
      texture2.center = new THREE.Vector2(0.5, 0.95);
      texture2.rotation = Math.PI;


      const texture3 = texture.clone();
      texture3.needsUpdate = true;
      texture3.repeat.set(1,0.05);
      texture3.flipY = false;
      texture3.center = new THREE.Vector2(0.5, 0.05);
      texture3.rotation = Math.PI;

      const texture4 = texture.clone();
      texture4.needsUpdate = true;
      texture4.repeat.set(0.05,1);
      texture4.flipY = false;
      texture4.center = new THREE.Vector2(0.95, 0.5);
      texture4.rotation = Math.PI;

      const texture5 = texture.clone();
      texture5.needsUpdate = true;
      texture5.repeat.set(0.05,1);
      texture5.flipY = false;
      texture5.center = new THREE.Vector2(0.05, 0.5);
      texture5.rotation = Math.PI;


      const texture6 = texture.clone();
      texture6.needsUpdate = true;
      texture6.flipY = false;
    


      const cubeMaterialArray:any = [];
  
      // order to add materials: x+,x-,y+,y-,z+,z-
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture5 } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture4 }) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture3 }) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture2 }) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture6 } ) );
      cubeMaterialArray.push( albumtextureMat );
  

      const textureWidth = texture.image.width;
      const textureHeight = texture.image.height;
      let width;
      let height; 
      let ratio;
      if(textureWidth > textureHeight) {
        ratio = textureHeight / textureWidth;
        width = 20;
        height = 20 * ratio;
      }  else {
        ratio = textureWidth / textureHeight;
        width = 20 * ratio;
        height = 20;
      }
  
      const cubeGeo = new THREE.BoxGeometry(width, height, 1);
      self.mesh = new THREE.Mesh(cubeGeo, cubeMaterialArray);
      self.mesh.rotation.x = Math.PI * .5;
      self.mesh.rotation.z = Math.PI * 1;
      self.mesh.position.set( 0, 0, 0);
      self.mesh.castShadow = true;
      self.mesh.receiveShadow = true;
      self.mesh.scale.set( scale, scale, scale );

      if(self.callback) {
        self.callback(this.mesh);
      }

    });
    
  
    /*
    loader.load(model, function ( gltf ) {
      gltf.scene.traverse((o) => {
        if ((<THREE.Mesh> o).isMesh) {
          (<THREE.Mesh> o).material = albumtextureMat;
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
      
    } );*/
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