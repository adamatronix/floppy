import * as THREE from 'three';
import FloppyObject from './FloppyObject';

interface Origin {
  x: number;
  y: number;
}

class FloppyStage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  origin: Origin;
  floppy: FloppyObject;

  constructor() {
    this.setupWorld();
    this.setupEvents();
    this.renderFrame();
  }

  setupEvents = () => {
    document.body.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.body.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    document.body.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  setupWorld = () => {
    this.container = document.createElement('div');
    this.container.style.width = '100%';
    this.container.style.height = '100vh';
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    document.body.appendChild(this.container);
    this.origin = { x: this.container.offsetWidth/2, y: this.container.offsetHeight/2 };

    this.scene = new THREE.Scene();

    const planeGeometry = new THREE.PlaneGeometry( 500, 500 );
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );

    const ground = new THREE.Mesh( planeGeometry, planeMaterial );

    ground.position.set( 0, 0, 0);
    ground.rotation.x = Math.PI * -.5;

    ground.castShadow = false;
    ground.receiveShadow = true;

    this.scene.add( ground );

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 25, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    this.floppy = new FloppyObject({ x: 8, y: 0.6, z: 8});
    this.scene.add(this.floppy.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
    this.container.appendChild( this.renderer.domElement );
  }

  renderFrame = () => {
    this.renderer.clear();
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.renderFrame);
  }

  /**
   * On mouse move trigger a tween to the current mouse position.
   * 
   * @param {object} e Mouse event 
   */ 
   onMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const posX = x - this.origin.x;
    const posY = y - this.origin.y;

    //console.log(`(${posX},${posY})`)

    if(-400 < posX && posX < 400) {
      let range = 400 - (-400);
      let adjustedX = posX + 400;
      let percent = adjustedX / range;
      let movement = percent * 1.5;
      this.floppy.mesh.rotation.z = -0.75 + movement;
    }

    if(-400 < posY && posY < 400) {
      let range = 400 - (-400);
      let adjustedY = posY + 400;
      let percent = adjustedY / range;
      let movement = percent * 1.5;
      this.floppy.mesh.rotation.x = -0.75 + movement;
    }

  }

  /**
   * On the mouse entering the document, reveal the cursor
   * 
   * @param {*} e Mouse event
   */
   onMouseEnter = (e: MouseEvent) => {

    }

    /**
     * On mouse leaving the document, hide the cursor
     * 
     * @param {*} e 
     */
    onMouseLeave = (e: MouseEvent) =>  {
    }


}

export default FloppyStage;