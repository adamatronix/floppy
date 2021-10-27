import * as THREE from 'three';
var FloppyRenderer = /** @class */ (function () {
    function FloppyRenderer(container, stages) {
        var _this = this;
        this.setupRenderer = function () {
            _this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            _this.renderer.setClearColor(0x000000, 0);
            _this.renderer.shadowMap.enabled = true;
            _this.renderer.shadowMap.type = THREE.PCFShadowMap;
            _this.renderer.clear();
            _this.renderer.setPixelRatio(window.devicePixelRatio);
            _this.renderer.setSize(_this.container.offsetWidth, _this.container.offsetHeight);
            _this.container.appendChild(_this.renderer.domElement);
        };
        this.updateSize = function () {
            var width = _this.container.clientWidth;
            var height = _this.container.clientHeight;
            _this.renderer.setSize(width, height, false);
        };
        this.animate = function () {
            _this.render();
            requestAnimationFrame(_this.animate);
        };
        this.render = function () {
            var self = _this;
            _this.updateSize();
            _this.container.style.transform = "translateY(" + window.scrollY + "px)";
            _this.renderer.setClearColor(0x000000, 0);
            _this.renderer.setScissorTest(false);
            _this.renderer.clear();
            _this.renderer.setScissorTest(true);
            _this.stages.forEach(function (stage) {
                var scene = stage.scene;
                var element = stage.container;
                var rect = element.getBoundingClientRect();
                // check if it's offscreen. If so skip it
                if (rect.bottom < 0 || rect.top > self.renderer.domElement.clientHeight ||
                    rect.right < 0 || rect.left > self.renderer.domElement.clientWidth) {
                    return; // it's off screen
                }
                stage.floppy.tickerText.needsUpdate = true;
                stage.floppy.tickerTextHorizontal.needsUpdate = true;
                //set the viewport
                var width = rect.right - rect.left;
                var height = rect.bottom - rect.top;
                var left = rect.left;
                var bottom = self.renderer.domElement.clientHeight - rect.bottom;
                self.renderer.setViewport(left, bottom, width, height);
                self.renderer.setScissor(left, bottom, width, height);
                self.renderer.render(scene, stage.camera);
                stage.stats ? stage.stats.update() : null;
            });
        };
        this.container = container;
        this.stages = stages;
        this.setupRenderer();
        this.animate();
    }
    return FloppyRenderer;
}());
export default FloppyRenderer;
//# sourceMappingURL=FloppyRenderer.js.map