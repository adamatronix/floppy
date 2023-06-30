import * as THREE from 'three';
import { gsap } from "gsap";
import Stats from 'three/examples/jsm/libs/stats.module';
import FloppyObject from './FloppyObject';
import { AnimationTypes } from './AnimationTypes';

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
  sphere: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  origin: Origin;
  cachedMouse: Origin;
  mouseVector: any;
  floppy: any;
  texture:string;
  dimensions:any;
  stats:Stats;
  requestId:number;
  punctured:boolean = false;
  intersectionObserver:IntersectionObserver;

  constructor(el: HTMLDivElement, floppy: any, options?: LooseObject) {
    this.container = el;
    this.floppy = floppy;
    this.options = {
      requireCallback: false,
      ground: true,
      background: true,
      trailEffect: false,
      tickerColour: '#FFF',
      elastic: false,
      stats: false,
      puncturable: false,
      slaveMode: false,
      manual: false,
      autoRotate: 0,
      animation: 'pivotRotate'

    }

    this.options = { ...this.options, ...options};
    this.stats = this.options.stats ? this.setupStats() : null;
    this.setupEvents();

    if(this.options.slaveMode) {
      this.setupScene();
    } else {
      this.setupWorld();
      //this.setupObserver();
    }

    if(this.options.requireCallback) {
      this.floppy.callback = this.addMesh;
    } 
  }

  setupEvents = () => {
    if(this.options.autoRotate > 0) {
      this.autoRotationAnimation(this.options.autoRotate)
    }

    if(!this.options.manual)
      document.body.addEventListener("mousemove", this.onMouseMove);

    window.addEventListener("scroll", this.onScroll);
  }

  setupObserver = () => {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startRender();
        } else {
          this.stopRender();
        }
      });     
   });

   this.intersectionObserver.observe(this.container);
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

  setupScene = () => {
    const bounding = this.container.getBoundingClientRect();
    this.origin = { x: bounding.x + this.container.offsetWidth/2, y: bounding.y + this.container.offsetHeight/2 };

    this.scene = new THREE.Scene();
    this.scene.userData.element = this.container;
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 100, 0);
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

    /*this.floppy = new FloppyObject(this.dimensions, this.texture, this.options.tickerColour, this.options.tickerTextureH, this.options.tickerTextureV);
    this.scene.add(this.floppy.mesh);*/
  }

  addMesh = (mesh: THREE.Group) => {
    this.scene.add(mesh);
    console.log("add mesh");
  }

  setupWorld = () => {
    const bounding = this.container.getBoundingClientRect();
    this.origin = { x: bounding.x + this.container.offsetWidth/2, y: bounding.y + this.container.offsetHeight/2 };

    this.scene = new THREE.Scene();

    const planeGeometry = new THREE.PlaneGeometry( 500, 500 );
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );


    if(this.floppy.mesh) {
      this.addMesh(this.floppy.mesh)
    }
    


    if (this.options.ground) {
      const ground = new THREE.Mesh( planeGeometry, planeMaterial );

      ground.position.set( 0, 0, 0);
      ground.rotation.x = Math.PI * -.5;

      ground.castShadow = false;
      ground.receiveShadow = true;

      this.scene.add( ground );
    }
    

    const fov = 45;
    const aspect = this.container.offsetWidth / this.container.offsetHeight;  // the canvas default
    const near = 0.1;
    const far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0,40, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
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
    if(!this.options.requireCallback) {
      this.scene.add(this.floppy.mesh);
    }
    

    /*this.floppy = new FloppyAlbum(this.texture, (mesh: THREE.Group) => {
      this.scene.add(mesh);
    });*/

    this.renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: true, alpha: !this.options.background, preserveDrawingBuffer: this.options.trailEffect ? true : false});
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
    this.requestId = requestAnimationFrame(this.renderFrame);
    this.renderer.clear(this.options.trailEffect ? false : true);
    this.floppy.needsUpdate();
    this.renderer.render( this.scene, this.camera );
    this.stats ? this.stats.update() : null;
  }

  stopRender = () => {
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
    this.floppy.stopRender();
    this.destroyEvents();
  }

  startRender = () => {
    this.renderFrame();
    this.floppy.startRender();
    this.setupEvents();
  }

  autoRotationAnimation = (duration:number) => {
    gsap.to(this.floppy.mesh.rotation, 
      { 
        duration: duration,
        y:  6.28319,
        repeat: -1,
        ease: "linear"
      }
    );
  }

  onScroll = () => {
    const bounding = this.container.getBoundingClientRect();
    this.origin = { x: bounding.x + this.container.offsetWidth/2, y: bounding.y + this.container.offsetHeight/2 };    
  }

  /**
   * On mouse move trigger a tween to the current mouse position.
   * 
   * @param {object} e Mouse event 
   */ 
   onMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    this.cachedMouse = { x:x, y:y };
    this.mouseVector = this.getNormalizedMouseVector(e);
    AnimationTypes(this.floppy,this.mouseVector.x,this.mouseVector.z, this.options.animation);

  }

  getNormalizedMouseVector = (e: MouseEvent) => {
    let mouse:LooseObject = {};

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

    // Make the sphere follow the mouse
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject( this.camera );
    
    var dir = vector.sub( this.camera.position ).normalize();
    var distance = - this.camera.position.y / dir.y;
    return this.camera.position.clone().add( dir.multiplyScalar( distance ) );
  }

  destroyEvents = () => {
    document.body.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("scroll", this.onScroll);
  }

  destroy = () => {
    this.destroyEvents();
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
    this.floppy.stopRender();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.container.innerHTML = '';
  }

}

export default FloppyStage;