import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class FloppyAlbum { 
  mesh: THREE.Mesh;
  callback: Function;

  constructor(image: string, scale: number, width?: number, height?: number, placeholder?: string) {
    this.createShape(image, scale, width, height, placeholder);
  }

  createShape = (image: string, scale: number, width?:number, height?:number, placeholder?:string) => {
    const self = this;
    const loader = new GLTFLoader();
    const texture = new THREE.TextureLoader().load(image);
    texture.flipY = false;
    const textureMat = new THREE.MeshPhongMaterial( { map: texture } );
  

    if(width && height) {
      this.buildBaseModel(width,height,scale)
    }

    if(placeholder) {
      this.loadTexture(placeholder, (material:THREE.MeshPhongMaterial, texture:any) => {
        if(this.mesh) {
          this.mesh.material = material;
        }

        this.loadTexture(image, (material:THREE.MeshPhongMaterial, texture:any) => {
          if(this.mesh) {
            this.mesh.material = material;
          }
        })
      })

    } else {
      this.loadTexture(image, (material:THREE.MeshPhongMaterial, texture:any) => {
        if(this.mesh) {
          this.mesh.material = material;
        } else {
          const textureWidth = texture.image.width;
          const textureHeight = texture.image.height;
          this.buildBaseModel(textureWidth,textureHeight,scale,material);
        }
      })
    }

    
    
  
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

  loadTexture = (image:string, callback:Function) => {
    const manager = new THREE.LoadingManager();
    manager.onLoad = function () {

    }

    const TextureLoader = new THREE.TextureLoader(manager);
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
      texture6.flipY = true;
    


      const cubeMaterialArray:any = [];
  
      // order to add materials: x+,x-,y+,y-,z+,z-
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture5 } ) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture4 }) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture3 }) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture2 }) );
      cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture6 } ) );
      cubeMaterialArray.push( albumtextureMat );

      callback(cubeMaterialArray,texture);
     
    });

  }

  buildBaseModel = (assetWidth:number,assetHeight:number, scale:number, material?:THREE.MeshPhongMaterial) => {
      let width;
      let height; 
      let ratio;
      if(assetWidth > assetHeight) {
        ratio = assetHeight / assetWidth;
        width = 20;
        height = 20 * ratio;
      }  else {
        ratio = assetWidth / assetHeight;
        width = 20 * ratio;
        height = 20;
      }
  

    const cubeGeo = new THREE.BoxGeometry(width, height, 1);
    this.mesh = new THREE.Mesh(cubeGeo, material || new THREE.MeshPhongMaterial( { color: 0xffffff, opacity: 0 } ));
    this.mesh.rotation.x = Math.PI * .5;
    this.mesh.rotation.z = Math.PI * 1;
    this.mesh.position.set( 0, 0, 0);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.scale.set( scale, scale, scale );
    if(this.callback) {
      this.callback(this.mesh);
    }

    return this.mesh;
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