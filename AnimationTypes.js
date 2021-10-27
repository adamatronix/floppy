import { gsap } from "gsap";
import { findPointBetweenTwo } from './utils/findPointBetweenTwo';
export var AnimationTypes = function (floppy, x, y, type) {
    var types = {
        pivotRotate: function (floppy, x, y) {
            var distance = findPointBetweenTwo(0.1, 0, 0, x, y);
            gsap.to(floppy.mesh.position, {
                duration: 2,
                z: distance.y,
                x: distance.x
            });
            if (-10 < x && x < 10) {
                var range = 10 - (-10);
                var adjustedX = x + 10;
                var percent = adjustedX / range;
                var movement = percent * 1.5;
                gsap.to(floppy.mesh.rotation, {
                    duration: .8,
                    y: 0.75 - movement,
                });
            }
            if (-20 < y && y < 20) {
                var range = 20 - (-20);
                var adjustedY = y + 20;
                var percent = adjustedY / range;
                var movement = percent * 1.5;
                gsap.to(floppy.mesh.rotation, {
                    duration: .8,
                    x: ((Math.PI * .5) - 0.75) + movement
                });
            }
        },
        followTilt: function (floppy, x, y) {
            // Go to where the cursor is.
            gsap.to(floppy.mesh.position, {
                duration: 1,
                z: y,
                x: x,
                onUpdate: function () {
                    var distanceX = Math.floor(x) - Math.floor(floppy.mesh.position.x);
                    var distanceY = Math.floor(y) - Math.floor(floppy.mesh.position.z);
                    var percentX = distanceX / 40;
                    var percentY = distanceY / 40;
                    var movementX = percentX * -1.5;
                    var movementY = percentY * 1.5;
                    gsap.to(floppy.mesh.rotation, {
                        ease: "power2.out",
                        duration: .8,
                        y: movementX,
                        x: ((Math.PI * .5)) + movementY
                    });
                },
                onComplete: function () {
                }
            });
        }
    };
    types[type](floppy, x, y);
};
export default AnimationTypes;
//# sourceMappingURL=AnimationTypes.js.map