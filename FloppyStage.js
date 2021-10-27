var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { AnimationTypes } from './AnimationTypes';
var FloppyStage = /** @class */ (function () {
    function FloppyStage(el, floppy, options) {
        var _this = this;
        this.punctured = false;
        this.setupEvents = function () {
            if (!_this.options.manual)
                document.body.addEventListener("mousemove", _this.onMouseMove);
            window.addEventListener("scroll", _this.onScroll);
        };
        this.setupObserver = function () {
            _this.intersectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        _this.startRender();
                    }
                    else {
                        _this.stopRender();
                    }
                });
            });
            _this.intersectionObserver.observe(_this.container);
        };
        this.setupStats = function () {
            var stats = Stats();
            stats.setMode(0);
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0';
            stats.domElement.style.top = '0';
            _this.container.appendChild(stats.domElement);
            return stats;
        };
        this.setupScene = function () {
            var bounding = _this.container.getBoundingClientRect();
            _this.origin = { x: bounding.x + _this.container.offsetWidth / 2, y: bounding.y + _this.container.offsetHeight / 2 };
            _this.scene = new THREE.Scene();
            _this.scene.userData.element = _this.container;
            var fov = 45;
            var aspect = 2; // the canvas default
            var near = 0.1;
            var far = 500;
            _this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            _this.camera.position.set(0, 30, 0);
            _this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            _this.camera.aspect = _this.container.offsetWidth / _this.container.offsetHeight;
            _this.camera.updateProjectionMatrix();
            var ambient = new THREE.AmbientLight(0xcccccc);
            _this.scene.add(ambient);
            var light = new THREE.PointLight(0xffffff, 0.2);
            light.castShadow = true;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 3000;
            light.shadow.mapSize.width = 2024;
            light.shadow.mapSize.height = 2024;
            // move the light back and up a bit
            light.position.set(-10, 20, -10);
            _this.scene.add(light);
            /*this.floppy = new FloppyObject(this.dimensions, this.texture, this.options.tickerColour, this.options.tickerTextureH, this.options.tickerTextureV);
            this.scene.add(this.floppy.mesh);*/
        };
        this.setupWorld = function () {
            var bounding = _this.container.getBoundingClientRect();
            _this.origin = { x: bounding.x + _this.container.offsetWidth / 2, y: bounding.y + _this.container.offsetHeight / 2 };
            _this.scene = new THREE.Scene();
            var planeGeometry = new THREE.PlaneGeometry(500, 500);
            var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            if (_this.options.ground) {
                var ground = new THREE.Mesh(planeGeometry, planeMaterial);
                ground.position.set(0, 0, 0);
                ground.rotation.x = Math.PI * -.5;
                ground.castShadow = false;
                ground.receiveShadow = true;
                _this.scene.add(ground);
            }
            var fov = 45;
            var aspect = _this.container.offsetWidth / _this.container.offsetHeight; // the canvas default
            var near = 0.1;
            var far = 500;
            _this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            _this.camera.position.set(0, 100, 0);
            _this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            _this.camera.updateProjectionMatrix();
            var ambient = new THREE.AmbientLight(0xcccccc);
            _this.scene.add(ambient);
            var light = new THREE.PointLight(0xffffff, 0.2);
            light.castShadow = true;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 3000;
            light.shadow.mapSize.width = 2024;
            light.shadow.mapSize.height = 2024;
            // move the light back and up a bit
            light.position.set(-10, 20, -10);
            _this.scene.add(light);
            _this.scene.add(_this.floppy.mesh);
            /*this.floppy = new FloppyAlbum(this.texture, (mesh: THREE.Group) => {
              this.scene.add(mesh);
            });*/
            _this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: !_this.options.background, preserveDrawingBuffer: _this.options.trailEffect ? true : false });
            _this.renderer.setClearColor(0x000000, 0);
            _this.renderer.shadowMap.enabled = true;
            _this.renderer.shadowMap.type = THREE.PCFShadowMap;
            _this.renderer.autoClear = _this.options.trailEffect ? false : true;
            _this.renderer.clear();
            _this.renderer.setPixelRatio(window.devicePixelRatio);
            _this.renderer.setSize(_this.container.offsetWidth, _this.container.offsetHeight);
            _this.container.appendChild(_this.renderer.domElement);
        };
        this.renderFrame = function () {
            _this.requestId = requestAnimationFrame(_this.renderFrame);
            _this.renderer.clear(_this.options.trailEffect ? false : true);
            _this.floppy.needsUpdate();
            _this.renderer.render(_this.scene, _this.camera);
            _this.stats ? _this.stats.update() : null;
        };
        this.stopRender = function () {
            cancelAnimationFrame(_this.requestId);
            _this.requestId = undefined;
            _this.floppy.stopRender();
            _this.destroyEvents();
        };
        this.startRender = function () {
            _this.renderFrame();
            _this.floppy.startRender();
            _this.setupEvents();
        };
        this.onScroll = function () {
            var bounding = _this.container.getBoundingClientRect();
            _this.origin = { x: bounding.x + _this.container.offsetWidth / 2, y: bounding.y + _this.container.offsetHeight / 2 };
        };
        /**
         * On mouse move trigger a tween to the current mouse position.
         *
         * @param {object} e Mouse event
         */
        this.onMouseMove = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.cachedMouse = { x: x, y: y };
            _this.mouseVector = _this.getNormalizedMouseVector(e);
            AnimationTypes(_this.floppy, _this.mouseVector.x, _this.mouseVector.z, _this.options.animation);
        };
        this.getNormalizedMouseVector = function (e) {
            var mouse = {};
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            // Make the sphere follow the mouse
            var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(_this.camera);
            var dir = vector.sub(_this.camera.position).normalize();
            var distance = -_this.camera.position.y / dir.y;
            return _this.camera.position.clone().add(dir.multiplyScalar(distance));
        };
        this.destroyEvents = function () {
            document.body.removeEventListener("mousemove", _this.onMouseMove);
            window.removeEventListener("scroll", _this.onScroll);
        };
        this.destroy = function () {
            _this.container.innerHTML = '';
            _this.destroyEvents();
        };
        this.container = el;
        this.floppy = floppy;
        this.options = {
            ground: true,
            background: true,
            trailEffect: false,
            tickerColour: '#FFF',
            elastic: false,
            stats: false,
            puncturable: false,
            slaveMode: false,
            manual: false,
            animation: 'pivotRotate'
        };
        this.options = __assign(__assign({}, this.options), options);
        this.stats = this.options.stats ? this.setupStats() : null;
        this.setupEvents();
        if (this.options.slaveMode) {
            this.setupScene();
        }
        else {
            this.setupWorld();
            this.setupObserver();
        }
    }
    return FloppyStage;
}());
export default FloppyStage;
//# sourceMappingURL=FloppyStage.js.map