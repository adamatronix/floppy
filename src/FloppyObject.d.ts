import * as THREE from 'three';
interface LooseObject {
    [key: string]: any;
}
declare class FloppyObject {
    mesh: THREE.Mesh;
    image: any;
    constructor(boxDimensions: LooseObject, image: any);
    buildMaterial: (asset: any, callback: any) => void;
    getMaterialArray: (texture: THREE.Texture) => THREE.MeshPhongMaterial[];
    updateMaterial: (image: any, width: number, height: number) => void;
    createShape: (boxDimensions: LooseObject, image: any) => void;
    startRender: () => void;
    stopRender: () => void;
    needsUpdate: () => void;
}
export default FloppyObject;
