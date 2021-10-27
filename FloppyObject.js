import * as THREE from 'three';
var FloppyObject = /** @class */ (function () {
    function FloppyObject(boxDimensions, image) {
        var _this = this;
        this.buildMaterial = function (asset, callback) {
            var cubeMaterialArray;
            if (asset instanceof THREE.Texture) {
                cubeMaterialArray = _this.getMaterialArray(asset);
                if (callback)
                    callback(cubeMaterialArray);
            }
            else {
                new THREE.TextureLoader().load(asset, function (texture) {
                    cubeMaterialArray = _this.getMaterialArray(texture);
                    if (callback)
                        callback(cubeMaterialArray);
                });
            }
        };
        this.getMaterialArray = function (texture) {
            // Create an array of materials to be used in a cube, one for each side
            var cubeMaterialArray = [];
            // order to add materials: x+,x-,y+,y-,z+,z-
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ map: texture }));
            return cubeMaterialArray;
        };
        this.updateMaterial = function (image, width, height) {
            _this.image = image;
            var ratio = height / width;
            _this.buildMaterial(image, function (mat) {
                _this.mesh.material = mat;
                _this.mesh.scale.y = _this.mesh.scale.x * ratio;
            });
        };
        this.createShape = function (boxDimensions, image) {
            var cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
            _this.mesh = new THREE.Mesh(cubeGeo, null);
            _this.mesh.position.set(0, 0, 0);
            _this.mesh.rotation.x = Math.PI * .5;
            _this.mesh.rotation.z = Math.PI * 1;
            _this.buildMaterial(image, function (mat) {
                _this.mesh.material = mat;
            });
        };
        this.startRender = function () {
            // put rendering stuff here
        };
        this.stopRender = function () {
            // put stop rendering stuff here
        };
        this.needsUpdate = function () {
        };
        this.image = image;
        this.createShape(boxDimensions, image);
    }
    return FloppyObject;
}());
export default FloppyObject;
//# sourceMappingURL=FloppyObject.js.map