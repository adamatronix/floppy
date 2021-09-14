import * as THREE from 'three';
import { CanvasTexture } from 'three';
import TickerTexture from './TickerTexture';

interface LooseObject {
  [key: string]: any
}

class FloppyObject { 
  mesh: THREE.Mesh;
  image:string;
  ticker:TickerTexture;
  tickerHorizontal:TickerTexture;
  tickerText:CanvasTexture;
  tickerTextHorizontal:CanvasTexture;
  tickerColour:string

  constructor(boxDimensions: LooseObject, image: string, tickerColour:string, tickerImageH:string, tickerImageV:string) {
    this.image = image;
    this.ticker = new TickerTexture('vertical',tickerColour,tickerImageV);
    this.tickerHorizontal = new TickerTexture('horizontal',tickerColour,tickerImageH);
    this.createShape(boxDimensions);
  }

  createShape = (boxDimensions: LooseObject) => {
    const texture = new THREE.TextureLoader().load(this.image);
    this.tickerText = new THREE.CanvasTexture(this.ticker.canvas);
    this.tickerTextHorizontal = new THREE.CanvasTexture(this.tickerHorizontal.canvas);
    //this.tickerText.repeat.set(0.008, 1);
    
    // Create an array of materials to be used in a cube, one for each side
    const cubeMaterialArray = [];

    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: this.tickerText } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: this.tickerText } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: this.tickerTextHorizontal } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: this.tickerTextHorizontal } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
    cubeMaterialArray.push( new THREE.MeshPhongMaterial( { map: texture  } ) );
    

    const cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#ACD2DD'});
    this.mesh = new THREE.Mesh(cubeGeo, cubeMaterialArray);
    this.mesh.position.set(0, 0, 0);

    this.mesh.rotation.x = Math.PI * .5;
    this.mesh.rotation.z = Math.PI * 1;
  }
}

export default FloppyObject;