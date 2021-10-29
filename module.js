import {Scene as $f3Ts0$Scene, PerspectiveCamera as $f3Ts0$PerspectiveCamera, Vector3 as $f3Ts0$Vector3, AmbientLight as $f3Ts0$AmbientLight, PointLight as $f3Ts0$PointLight, PlaneGeometry as $f3Ts0$PlaneGeometry, MeshPhongMaterial as $f3Ts0$MeshPhongMaterial, Mesh as $f3Ts0$Mesh, WebGLRenderer as $f3Ts0$WebGLRenderer, PCFShadowMap as $f3Ts0$PCFShadowMap, Texture as $f3Ts0$Texture, TextureLoader as $f3Ts0$TextureLoader, BoxGeometry as $f3Ts0$BoxGeometry} from "three";
import $f3Ts0$threeexamplesjsmlibsstatsmodule from "three/examples/jsm/libs/stats.module";
import {gsap as $f3Ts0$gsap} from "gsap";




const $999bcfba5899cc14$export$f6eaf06d148550f3 = (percent, x1, y1, x2, y2)=>{
    return {
        x: x1 + (x2 - x1) * percent,
        y: y1 + (y2 - y1) * percent
    };
};
var $999bcfba5899cc14$export$2e2bcd8739ae039 = $999bcfba5899cc14$export$f6eaf06d148550f3;


const $46d242e4a0825225$export$83bb4f246c15573a = (floppy, x, y, type)=>{
    const types = {
        pivotRotate: (floppy, x, y)=>{
            const distance = $999bcfba5899cc14$export$f6eaf06d148550f3(0.1, 0, 0, x, y);
            $f3Ts0$gsap.to(floppy.mesh.position, {
                duration: 2,
                z: distance.y,
                x: distance.x
            });
            if (-10 < x && x < 10) {
                let range = 20;
                let adjustedX = x + 10;
                let percent = adjustedX / range;
                let movement = percent * 1.5;
                $f3Ts0$gsap.to(floppy.mesh.rotation, {
                    duration: 0.8,
                    y: 0.75 - movement
                });
            }
            if (-20 < y && y < 20) {
                let range = 40;
                let adjustedY = y + 20;
                let percent = adjustedY / range;
                let movement = percent * 1.5;
                $f3Ts0$gsap.to(floppy.mesh.rotation, {
                    duration: 0.8,
                    x: Math.PI * 0.5 - 0.75 + movement
                });
            }
        },
        followTilt: (floppy, x, y)=>{
            // Go to where the cursor is.
            $f3Ts0$gsap.to(floppy.mesh.position, {
                duration: 1,
                z: y,
                x: x,
                onUpdate: ()=>{
                    const distanceX = Math.floor(x) - Math.floor(floppy.mesh.position.x);
                    const distanceY = Math.floor(y) - Math.floor(floppy.mesh.position.z);
                    let percentX = distanceX / 40;
                    let percentY = distanceY / 40;
                    let movementX = percentX * -1.5;
                    let movementY = percentY * 1.5;
                    $f3Ts0$gsap.to(floppy.mesh.rotation, {
                        ease: "power2.out",
                        duration: 0.8,
                        y: movementX,
                        x: Math.PI * 0.5 + movementY
                    });
                },
                onComplete: ()=>{
                }
            });
        }
    };
    types[type](floppy, x, y);
};
var $46d242e4a0825225$export$2e2bcd8739ae039 = $46d242e4a0825225$export$83bb4f246c15573a;


class $034e5542cabc6d8f$var$FloppyStage {
    constructor(el, floppy, options){
        this.punctured = false;
        this.setupEvents = ()=>{
            if (!this.options.manual) document.body.addEventListener("mousemove", this.onMouseMove);
            window.addEventListener("scroll", this.onScroll);
        };
        this.setupObserver = ()=>{
            this.intersectionObserver = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if (entry.isIntersecting) this.startRender();
                    else this.stopRender();
                });
            });
            this.intersectionObserver.observe(this.container);
        };
        this.setupStats = ()=>{
            const stats = $f3Ts0$threeexamplesjsmlibsstatsmodule();
            stats.setMode(0);
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0';
            stats.domElement.style.top = '0';
            this.container.appendChild(stats.domElement);
            return stats;
        };
        this.setupScene = ()=>{
            const bounding = this.container.getBoundingClientRect();
            this.origin = {
                x: bounding.x + this.container.offsetWidth / 2,
                y: bounding.y + this.container.offsetHeight / 2
            };
            this.scene = new $f3Ts0$Scene();
            this.scene.userData.element = this.container;
            const fov = 45;
            const aspect = 2; // the canvas default
            const near = 0.1;
            const far = 500;
            this.camera = new $f3Ts0$PerspectiveCamera(fov, aspect, near, far);
            this.camera.position.set(0, 30, 0);
            this.camera.lookAt(new $f3Ts0$Vector3(0, 0, 0));
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            const ambient = new $f3Ts0$AmbientLight(13421772);
            this.scene.add(ambient);
            const light = new $f3Ts0$PointLight(16777215, 0.2);
            light.castShadow = true;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 3000;
            light.shadow.mapSize.width = 2024;
            light.shadow.mapSize.height = 2024;
            // move the light back and up a bit
            light.position.set(-10, 20, -10);
            this.scene.add(light);
        /*this.floppy = new FloppyObject(this.dimensions, this.texture, this.options.tickerColour, this.options.tickerTextureH, this.options.tickerTextureV);
    this.scene.add(this.floppy.mesh);*/ };
        this.setupWorld = ()=>{
            const bounding = this.container.getBoundingClientRect();
            this.origin = {
                x: bounding.x + this.container.offsetWidth / 2,
                y: bounding.y + this.container.offsetHeight / 2
            };
            this.scene = new $f3Ts0$Scene();
            const planeGeometry = new $f3Ts0$PlaneGeometry(500, 500);
            const planeMaterial = new $f3Ts0$MeshPhongMaterial({
                color: 16777215
            });
            if (this.options.ground) {
                const ground = new $f3Ts0$Mesh(planeGeometry, planeMaterial);
                ground.position.set(0, 0, 0);
                ground.rotation.x = Math.PI * -0.5;
                ground.castShadow = false;
                ground.receiveShadow = true;
                this.scene.add(ground);
            }
            const fov = 45;
            const aspect = this.container.offsetWidth / this.container.offsetHeight; // the canvas default
            const near = 0.1;
            const far = 500;
            this.camera = new $f3Ts0$PerspectiveCamera(fov, aspect, near, far);
            this.camera.position.set(0, 100, 0);
            this.camera.lookAt(new $f3Ts0$Vector3(0, 0, 0));
            this.camera.updateProjectionMatrix();
            const ambient = new $f3Ts0$AmbientLight(13421772);
            this.scene.add(ambient);
            const light = new $f3Ts0$PointLight(16777215, 0.2);
            light.castShadow = true;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 3000;
            light.shadow.mapSize.width = 2024;
            light.shadow.mapSize.height = 2024;
            // move the light back and up a bit
            light.position.set(-10, 20, -10);
            this.scene.add(light);
            this.scene.add(this.floppy.mesh);
            /*this.floppy = new FloppyAlbum(this.texture, (mesh: THREE.Group) => {
      this.scene.add(mesh);
    });*/ this.renderer = new $f3Ts0$WebGLRenderer({
                antialias: true,
                alpha: !this.options.background,
                preserveDrawingBuffer: this.options.trailEffect ? true : false
            });
            this.renderer.setClearColor(0, 0);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = $f3Ts0$PCFShadowMap;
            this.renderer.autoClear = this.options.trailEffect ? false : true;
            this.renderer.clear();
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
            this.container.appendChild(this.renderer.domElement);
        };
        this.renderFrame = ()=>{
            this.requestId = requestAnimationFrame(this.renderFrame);
            this.renderer.clear(this.options.trailEffect ? false : true);
            this.floppy.needsUpdate();
            this.renderer.render(this.scene, this.camera);
            this.stats && this.stats.update();
        };
        this.stopRender = ()=>{
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
            this.floppy.stopRender();
            this.destroyEvents();
        };
        this.startRender = ()=>{
            this.renderFrame();
            this.floppy.startRender();
            this.setupEvents();
        };
        this.onScroll = ()=>{
            const bounding = this.container.getBoundingClientRect();
            this.origin = {
                x: bounding.x + this.container.offsetWidth / 2,
                y: bounding.y + this.container.offsetHeight / 2
            };
        };
        /**
   * On mouse move trigger a tween to the current mouse position.
   * 
   * @param {object} e Mouse event 
   */ this.onMouseMove = (e)=>{
            const x = e.clientX;
            const y = e.clientY;
            this.cachedMouse = {
                x: x,
                y: y
            };
            this.mouseVector = this.getNormalizedMouseVector(e);
            $46d242e4a0825225$export$83bb4f246c15573a(this.floppy, this.mouseVector.x, this.mouseVector.z, this.options.animation);
        };
        this.getNormalizedMouseVector = (e)=>{
            let mouse = {
            };
            mouse.x = e.clientX / window.innerWidth * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            // Make the sphere follow the mouse
            var vector = new $f3Ts0$Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(this.camera);
            var dir = vector.sub(this.camera.position).normalize();
            var distance = -this.camera.position.y / dir.y;
            return this.camera.position.clone().add(dir.multiplyScalar(distance));
        };
        this.destroyEvents = ()=>{
            document.body.removeEventListener("mousemove", this.onMouseMove);
            window.removeEventListener("scroll", this.onScroll);
        };
        this.destroy = ()=>{
            this.container.innerHTML = '';
            this.destroyEvents();
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
        this.options = {
            ...this.options,
            ...options
        };
        this.stats = this.options.stats ? this.setupStats() : null;
        this.setupEvents();
        if (this.options.slaveMode) this.setupScene();
        else {
            this.setupWorld();
            this.setupObserver();
        }
    }
}
var $034e5542cabc6d8f$export$2e2bcd8739ae039 = $034e5542cabc6d8f$var$FloppyStage;



class $f2a5ea243852f51b$var$FloppyObject {
    constructor(boxDimensions, image){
        this.buildMaterial = (asset, callback)=>{
            let cubeMaterialArray;
            if (asset instanceof $f3Ts0$Texture) {
                cubeMaterialArray = this.getMaterialArray(asset);
                if (callback) callback(cubeMaterialArray);
            } else new $f3Ts0$TextureLoader().load(asset, (texture)=>{
                cubeMaterialArray = this.getMaterialArray(texture);
                if (callback) callback(cubeMaterialArray);
            });
        };
        this.getMaterialArray = (texture)=>{
            // Create an array of materials to be used in a cube, one for each side
            const cubeMaterialArray = [];
            // order to add materials: x+,x-,y+,y-,z+,z-
            cubeMaterialArray.push(new $f3Ts0$MeshPhongMaterial({
                color: 16777215
            }));
            cubeMaterialArray.push(new $f3Ts0$MeshPhongMaterial({
                color: 16777215
            }));
            cubeMaterialArray.push(new $f3Ts0$MeshPhongMaterial({
                color: 16777215
            }));
            cubeMaterialArray.push(new $f3Ts0$MeshPhongMaterial({
                color: 16777215
            }));
            cubeMaterialArray.push(new $f3Ts0$MeshPhongMaterial({
                color: 16777215
            }));
            cubeMaterialArray.push(new $f3Ts0$MeshPhongMaterial({
                map: texture,
                transparent: true
            }));
            return cubeMaterialArray;
        };
        this.updateMaterial = (image, width, height)=>{
            this.image = image;
            const ratio = height / width;
            this.buildMaterial(image, (mat)=>{
                this.mesh.material = mat;
                this.mesh.scale.y = this.mesh.scale.x * ratio;
            });
        };
        this.createShape = (boxDimensions, image)=>{
            const cubeGeo = new $f3Ts0$BoxGeometry(boxDimensions.x, boxDimensions.y, boxDimensions.z);
            this.mesh = new $f3Ts0$Mesh(cubeGeo, null);
            this.mesh.position.set(0, 0, 0);
            this.mesh.rotation.x = Math.PI * 0.5;
            this.mesh.rotation.z = Math.PI * 1;
            this.buildMaterial(image, (mat)=>{
                this.mesh.material = mat;
            });
        };
        this.startRender = ()=>{
        // put rendering stuff here
        };
        this.stopRender = ()=>{
        // put stop rendering stuff here
        };
        this.needsUpdate = ()=>{
        };
        this.image = image;
        this.createShape(boxDimensions, image);
    }
}
var $f2a5ea243852f51b$export$2e2bcd8739ae039 = $f2a5ea243852f51b$var$FloppyObject;



const $a52eb8ac71cd0a74$export$897b113ee8307cd0 = (files)=>{
    const promiseArray = [];
    const loader = new $f3Ts0$TextureLoader();
    files.forEach((file)=>{
        const imgPromise = new Promise((resolve, reject)=>{
            loader.load(file.img, (texture)=>{
                resolve(texture);
            });
        });
        promiseArray.push(imgPromise);
    });
    return promiseArray;
};
var $a52eb8ac71cd0a74$export$2e2bcd8739ae039 = $a52eb8ac71cd0a74$export$897b113ee8307cd0;




export {$034e5542cabc6d8f$export$2e2bcd8739ae039 as FloppyStage, $f2a5ea243852f51b$export$2e2bcd8739ae039 as FloppyObject, $a52eb8ac71cd0a74$export$2e2bcd8739ae039 as loadTextures};
//# sourceMappingURL=module.js.map
