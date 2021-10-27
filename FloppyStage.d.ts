import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
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
    renderer: THREE.WebGLRenderer;
    container: HTMLDivElement;
    origin: Origin;
    cachedMouse: Origin;
    floppy: any;
    texture: string;
    dimensions: any;
    stats: Stats;
    requestId: number;
    punctured: boolean;
    intersectionObserver: IntersectionObserver;
    constructor(el: HTMLDivElement, texture: string, dimensions: any, options?: LooseObject);
    setupEvents: () => void;
    setupObserver: () => void;
    setupStats: () => Stats;
    setupScene: () => void;
    setupWorld: () => void;
    renderFrame: () => void;
    stopRender: () => void;
    startRender: () => void;
    moveObject: (x: number, y: number) => void;
    onScroll: () => void;
    /**
     * On mouse move trigger a tween to the current mouse position.
     *
     * @param {object} e Mouse event
     */
    onMouseMove: (e: MouseEvent) => void;
    destroyEvents: () => void;
    destroy: () => void;
}
export default FloppyStage;
