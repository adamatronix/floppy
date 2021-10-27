import * as THREE from 'three';
declare class FloppyRenderer {
    renderer: THREE.WebGLRenderer;
    container: HTMLDivElement;
    stages: any;
    constructor(container: HTMLDivElement, stages: any);
    setupRenderer: () => void;
    updateSize: () => void;
    animate: () => void;
    render: () => void;
}
export default FloppyRenderer;
