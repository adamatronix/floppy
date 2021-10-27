import * as THREE from 'three';
declare class FloppyAlbum {
    mesh: THREE.Mesh;
    callback: Function;
    constructor(image: string, callback: Function);
    createShape: (image: string) => void;
}
export default FloppyAlbum;
