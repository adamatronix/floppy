import * as THREE from 'three';
import TickerTexture from './TickerTexture';
var FloppyObject = /** @class */ (function () {
    function FloppyObject(boxDimensions, image, tickerColour, tickerImageH, tickerImageV) {
        var _this = this;
        this.createShape = function (boxDimensions) {
            var texture = new THREE.TextureLoader().load(_this.image);
            _this.tickerText = new THREE.CanvasTexture(_this.ticker.canvas);
            _this.tickerTextHorizontal = new THREE.CanvasTexture(_this.tickerHorizontal.canvas);
            //this.tickerText.repeat.set(0.008, 1);
            // Create an array of materials to be used in a cube, one for each side
            var cubeMaterialArray = [];
            // order to add materials: x+,x-,y+,y-,z+,z-
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ map: _this.tickerText }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ map: _this.tickerText }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ map: _this.tickerTextHorizontal }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ map: _this.tickerTextHorizontal }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
            cubeMaterialArray.push(new THREE.MeshPhongMaterial({ map: texture }));
            var cubeGeo = new THREE.BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
            var cubeMat = new THREE.MeshPhongMaterial({ color: '#ACD2DD' });
            _this.mesh = new THREE.Mesh(cubeGeo, cubeMaterialArray);
            _this.mesh.position.set(0, 0, 0);
            _this.mesh.rotation.x = Math.PI * .5;
            _this.mesh.rotation.z = Math.PI * 1;
        };
        this.image = image;
        this.ticker = new TickerTexture('vertical', tickerColour, tickerImageV);
        this.tickerHorizontal = new TickerTexture('horizontal', tickerColour, tickerImageH);
        this.createShape(boxDimensions);
    }
    return FloppyObject;
}());
export default FloppyObject;
//# sourceMappingURL=FloppyObject.js.map