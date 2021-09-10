import * as THREE from 'three';
import { gsap } from "gsap";
import Stats from 'three/examples/jsm/libs/stats.module';
import FloppyObject from './FloppyObject';
import FloppyAlbum from './FloppyAlbum';
import seensoundTexture from './assets/seensounds-uvmap_rotationADAM.png';

interface Origin {
  x: number;
  y: number;
}

interface LooseObject {
  [key: string]: any
}

class FloppyStage {
  options: LooseObject;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  origin: Origin;
  cachedMouse: Origin;
  floppy: any;
  texture:string;
  dimensions:any;
  stats:Stats;


  constructor(el: HTMLDivElement, texture:string, dimensions:any, options?: LooseObject) {
    this.container = el;
    this.texture = texture;
    this.dimensions = dimensions;
    this.options = {
      ground: true,
      background: true,
      trailEffect: false,
      tickerColour: '#FFF',
      stats: false
    }

    this.options = { ...this.options, ...options};
    this.stats = this.options.stats ? this.setupStats() : null;
    this.setupWorld();
    this.setupEvents();
    this.renderFrame();
  }

  setupEvents = () => {
    document.body.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  setupStats = () => {
    const stats = Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';
    this.container.appendChild(stats.domElement);

    return stats;
  }

  setupWorld = () => {
    const bounding = this.container.getBoundingClientRect();
    this.origin = { x: bounding.x + this.container.offsetWidth/2, y: bounding.y + this.container.offsetHeight/2 };

    this.scene = new THREE.Scene();

    const planeGeometry = new THREE.PlaneGeometry( 500, 500 );
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );


    if (this.options.ground) {
      const ground = new THREE.Mesh( planeGeometry, planeMaterial );

      ground.position.set( 0, 0, 0);
      ground.rotation.x = Math.PI * -.5;

      ground.castShadow = false;
      ground.receiveShadow = true;

      this.scene.add( ground );
    }
    

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 30, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
		this.camera.updateProjectionMatrix();

    const ambient = new THREE.AmbientLight( 0xcccccc );
	  this.scene.add( ambient );

    const light = new THREE.PointLight( 0xffffff, 0.2);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 3000;
    light.shadow.mapSize.width = 2024;
    light.shadow.mapSize.height = 2024;
    // move the light back and up a bit
    light.position.set( -10, 20, -10 );
    this.scene.add(light);

    this.floppy = new FloppyObject(this.dimensions, this.texture, this.options.tickerColour);
    this.scene.add(this.floppy.mesh);

    /*this.floppy = new FloppyAlbum(this.texture, (mesh: THREE.Group) => {
      this.scene.add(mesh);
    });*/

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: !this.options.background, preserveDrawingBuffer: this.options.trailEffect ? true : false});
    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.autoClear = this.options.trailEffect ? false : true;
    this.renderer.clear();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
    this.container.appendChild( this.renderer.domElement );
  }

  renderFrame = () => {
    this.renderer.clear(this.options.trailEffect ? false : true);
    this.floppy.tickerText.needsUpdate = true;
    this.floppy.tickerTextHorizontal.needsUpdate = true;
    
    this.renderer.render( this.scene, this.camera );
    this.stats ? this.stats.update() : null;
    requestAnimationFrame(this.renderFrame);
  }

  moveObject = (x:number,y:number) => {

    const posX = x - this.origin.x;
    const posY = y - this.origin.y;

    //console.log(`(${posX},${posY})`)

    if(-400 < posX && posX < 400) {
      let range = 400 - (-400);
      let adjustedX = posX + 400;
      let percent = adjustedX / range;
      let movement = percent * 1.5;
      if(this.floppy && this.floppy.mesh) {
        gsap.to(this.floppy.mesh.rotation, 
          { 
            duration: .8,
            y:  0.75 - movement,
          }
        );

        //this.floppy.mesh.rotation.y = 0.75 - movement;
      }
    }

    if(-400 < posY && posY < 400) {
      let range = 400 - (-400);
      let adjustedY = posY + 400;
      let percent = adjustedY / range;
      let movement = percent * 1.5;
      if(this.floppy && this.floppy.mesh) {
        gsap.to(this.floppy.mesh.rotation, 
          { 
            duration: .8,
            x:  ((Math.PI * .5) - 0.75) + movement,
          }
        );
        //this.floppy.mesh.rotation.x = ((Math.PI * .5) - 0.75) + movement;
      }
    }

  }

  onScroll = () => {
    const bounding = this.container.getBoundingClientRect();
    this.origin = { x: bounding.x + this.container.offsetWidth/2, y: bounding.y + this.container.offsetHeight/2 };    

    if(this.cachedMouse) {
      this.moveObject(this.cachedMouse.x, this.cachedMouse.y);
    }
    
  }

  /**
   * On mouse move trigger a tween to the current mouse position.
   * 
   * @param {object} e Mouse event 
   */ 
   onMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    this.moveObject(x,y);
    this.cachedMouse = { x:x, y:y };
  }

  destroy = () => {
    this.container.innerHTML = '';
    document.body.removeEventListener("mousemove", this.onMouseMove.bind(this));
    window.removeEventListener("scroll", this.onScroll.bind(this));
  }

}

export default FloppyStage;