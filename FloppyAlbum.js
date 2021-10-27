import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AlbumShape from './assets/floppy.glb';
var FloppyAlbum = /** @class */ (function () {
    function FloppyAlbum(image, callback) {
        var _this = this;
        this.createShape = function (image) {
            var self = _this;
            var loader = new GLTFLoader();
            var texture = new THREE.TextureLoader().load(image);
            texture.flipY = false;
            var textureMat = new THREE.MeshPhongMaterial({ map: texture });
            loader.load(AlbumShape, function (gltf) {
                gltf.scene.traverse(function (o) {
                    if (o.isMesh) {
                        o.material = textureMat;
                        o.rotation.x = Math.PI * .5;
                        o.rotation.z = Math.PI * 1;
                        o.position.set(0, 10, 0);
                        o.castShadow = true;
                        o.receiveShadow = true;
                        self.mesh = o;
                    }
                });
                self.callback(gltf.scene);
            });
        };
        this.callback = callback;
        this.createShape(image);
    }
    return FloppyAlbum;
}());
export default FloppyAlbum;
//# sourceMappingURL=FloppyAlbum.js.map