var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as THREE from 'three';
import FloppyObject from './FloppyObject';
import TickerTexture from './TickerTexture';
var FloppyTicker = /** @class */ (function (_super) {
    __extends(FloppyTicker, _super);
    function FloppyTicker(boxDimensions, image, tickerImageH, tickerImageV, tickerColour) {
        var _this = _super.call(this, boxDimensions, image) || this;
        _this.createShape = function (boxDimensions) {
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
        _this.startRender = function () {
            _this.ticker.startRender();
            _this.tickerHorizontal.startRender();
        };
        _this.stopRender = function () {
            _this.ticker.stopRender();
            _this.tickerHorizontal.stopRender();
        };
        _this.needsUpdate = function () {
            _this.tickerText.needsUpdate = true;
            _this.tickerTextHorizontal.needsUpdate = true;
        };
        _this.ticker = new TickerTexture('vertical', tickerColour, tickerImageV);
        _this.tickerHorizontal = new TickerTexture('horizontal', tickerColour, tickerImageH);
        _this.createShape(boxDimensions);
        return _this;
    }
    return FloppyTicker;
}(FloppyObject));
export default FloppyTicker;
//# sourceMappingURL=FloppyTicker.js.map