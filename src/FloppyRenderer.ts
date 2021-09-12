import * as THREE from 'three';
import FloppyStage from './FloppyStage';


class FloppyRenderer {
  renderer: THREE.WebGLRenderer;
  container:HTMLDivElement;
  stages: any;
  
  constructor(container:HTMLDivElement, stages:any) {
    this.container = container;
    this.stages = stages;
    this.setupRenderer();
    this.animate();
  }

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.clear();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
    this.container.appendChild( this.renderer.domElement );
  }

  updateSize = () => {

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;


    this.renderer.setSize( width, height, false );

  }

  animate = () => {

    this.render();
    requestAnimationFrame( this.animate );

  }

  render = () => {
    const self = this;
    this.updateSize();
		this.container.style.transform = `translateY(${window.scrollY}px)`;

    this.renderer.setClearColor( 0x000000, 0 );
		this.renderer.setScissorTest( false );
		this.renderer.clear();
		this.renderer.setScissorTest( true );
    this.stages.forEach( function ( stage:FloppyStage ) {
      
      const scene = stage.scene;
      const element = stage.container;
      const rect = element.getBoundingClientRect();

      // check if it's offscreen. If so skip it
      if ( rect.bottom < 0 || rect.top > self.renderer.domElement.clientHeight ||
        rect.right < 0 || rect.left > self.renderer.domElement.clientWidth ) {
        return; // it's off screen

      }

      stage.floppy.tickerText.needsUpdate = true;
      stage.floppy.tickerTextHorizontal.needsUpdate = true;

      //set the viewport
      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
    
      const left = rect.left;
      const bottom = self.renderer.domElement.clientHeight - rect.bottom;

      self.renderer.setViewport( left, bottom, width, height );
      self.renderer.setScissor( left, bottom, width, height );
      self.renderer.render( scene, stage.camera );
      stage.stats ? stage.stats.update() : null;
    });
  }
}

export default FloppyRenderer;