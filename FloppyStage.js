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
import { gsap } from "gsap";
import Stats from 'three/examples/jsm/libs/stats.module';
import FloppyObject from './FloppyObject';
import { findPointBetweenTwo } from './utils/findPointBetweenTwo';
import { distanceOfLine } from './utils/distanceOfLine';
var FloppyStage = /** @class */ (function () {
    function FloppyStage(el, texture, dimensions, options) {
        var _this = this;
        this.punctured = false;
        this.setupEvents = function () {
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
            _this.floppy = new FloppyObject(_this.dimensions, _this.texture, _this.options.tickerColour, _this.options.tickerTextureH, _this.options.tickerTextureV);
            _this.scene.add(_this.floppy.mesh);
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
            _this.floppy = new FloppyObject(_this.dimensions, _this.texture, _this.options.tickerColour, _this.options.tickerTextureH, _this.options.tickerTextureV);
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
            _this.floppy.tickerText.needsUpdate = true;
            _this.floppy.tickerTextHorizontal.needsUpdate = true;
            _this.renderer.render(_this.scene, _this.camera);
            _this.stats ? _this.stats.update() : null;
        };
        this.stopRender = function () {
            cancelAnimationFrame(_this.requestId);
            _this.requestId = undefined;
            _this.floppy.ticker.stopRender();
            _this.floppy.tickerHorizontal.stopRender();
            _this.destroyEvents();
        };
        this.startRender = function () {
            _this.renderFrame();
            _this.floppy.ticker.startRender();
            _this.floppy.tickerHorizontal.startRender();
            _this.setupEvents();
        };
        this.moveObject = function (x, y) {
            var posX = x - _this.origin.x;
            var posY = y - _this.origin.y;
            if (_this.options.puncturable && !_this.punctured) {
                var proximity = distanceOfLine(0, 0, posX, posY);
                if (proximity < _this.options.puncturable)
                    _this.punctured = true;
                return;
            }
            if (_this.options.elastic) {
                var distance = findPointBetweenTwo(0.002, 0, 0, posX, posY);
                gsap.to(_this.floppy.mesh.position, {
                    duration: 2,
                    z: distance.y,
                    x: distance.x
                });
            }
            if (-400 < posX && posX < 400) {
                var range = 400 - (-400);
                var adjustedX = posX + 400;
                var percent = adjustedX / range;
                var movement = percent * 1.5;
                if (_this.floppy && _this.floppy.mesh) {
                    gsap.to(_this.floppy.mesh.rotation, {
                        duration: .8,
                        y: 0.75 - movement,
                    });
                    //this.floppy.mesh.rotation.y = 0.75 - movement;
                }
            }
            if (-400 < posY && posY < 400) {
                var range = 400 - (-400);
                var adjustedY = posY + 400;
                var percent = adjustedY / range;
                var movement = percent * 1.5;
                if (_this.floppy && _this.floppy.mesh) {
                    gsap.to(_this.floppy.mesh.rotation, {
                        duration: .8,
                        x: ((Math.PI * .5) - 0.75) + movement,
                    });
                    //this.floppy.mesh.rotation.x = ((Math.PI * .5) - 0.75) + movement;
                }
            }
        };
        this.onScroll = function () {
            var bounding = _this.container.getBoundingClientRect();
            _this.origin = { x: bounding.x + _this.container.offsetWidth / 2, y: bounding.y + _this.container.offsetHeight / 2 };
            if (_this.cachedMouse) {
                _this.moveObject(_this.cachedMouse.x, _this.cachedMouse.y);
            }
        };
        /**
         * On mouse move trigger a tween to the current mouse position.
         *
         * @param {object} e Mouse event
         */
        this.onMouseMove = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.moveObject(x, y);
            _this.cachedMouse = { x: x, y: y };
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
        this.texture = texture;
        this.dimensions = dimensions;
        this.options = {
            ground: true,
            background: true,
            trailEffect: false,
            tickerColour: '#FFF',
            elastic: false,
            stats: false,
            puncturable: false,
            slaveMode: false,
            tickerTextureH: null,
            tickerTextureV: null
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