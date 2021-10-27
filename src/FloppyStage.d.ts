import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import FloppyObject from './FloppyObject';
interface Origin {
    x: number;
    y: number;
}
interface LooseObject {
    [key: string]: any;
}
declare class FloppyStage {
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
    texture: string;
    dimensions: any;
    stats: Stats;
    requestId: number;
    punctured: boolean;
    intersectionObserver: IntersectionObserver;
    constructor(el: HTMLDivElement, floppy: FloppyObject, options?: LooseObject);
    setupEvents: () => void;
    setupObserver: () => void;
    setupStats: () => Stats;
    setupScene: () => void;
    setupWorld: () => void;
    renderFrame: () => void;
    stopRender: () => void;
    startRender: () => void;
    onScroll: () => void;
    /**
     * On mouse move trigger a tween to the current mouse position.
     *
     * @param {object} e Mouse event
     */
    onMouseMove: (e: MouseEvent) => void;
    getNormalizedMouseVector: (e: MouseEvent) => THREE.Vector3;
    destroyEvents: () => void;
    destroy: () => void;
}
export default FloppyStage;
