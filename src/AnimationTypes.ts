import { gsap } from "gsap";
import FloppyObject from './FloppyObject';
import FloppyAlbum from './FloppyAlbum';
import { findPointBetweenTwo } from './utils/findPointBetweenTwo';
import { distanceOfLine } from './utils/distanceOfLine';


export const AnimationTypes = (floppy:any, x:number, y:number, type:string) => {

  const types:any = {
    rotate: (floppy:any, x:number, y:number) => {
      
      if(-10 < x && x < 10) {
        let range = 10 - (-10);
        let adjustedX = x + 10;
        let percent = adjustedX / range;
        let movement = percent * 1.5;
      
          gsap.to(floppy.mesh.rotation, 
            { 
              duration: .8,
              y:  0.75 - movement,
            }
          );
       }

       if(-20 < y && y < 20) {
        let range = 20 - (-20);
        let adjustedY = y + 20;
        let percent = adjustedY / range;
        let movement = percent * 1.5;
      
          gsap.to(floppy.mesh.rotation, 
            { 
              duration: .8,
              x: ((Math.PI * .5) - 0.75) + movement
            }
          );
       }
    },

    pivotRotate: (floppy:any, x:number, y:number) => {

      const distance = findPointBetweenTwo(0.1,0,0,x,y);
      gsap.to(floppy.mesh.position, 
        { 
          duration: 2,
          z: distance.y,
          x: distance.x
        }
      );
      
     
      
      if(-10 < x && x < 10) {
        let range = 10 - (-10);
        let adjustedX = x + 10;
        let percent = adjustedX / range;
        let movement = percent * 1.5;
      
          gsap.to(floppy.mesh.rotation, 
            { 
              duration: .8,
              y:  0.75 - movement,
            }
          );
       }

       if(-20 < y && y < 20) {
        let range = 20 - (-20);
        let adjustedY = y + 20;
        let percent = adjustedY / range;
        let movement = percent * 1.5;
      
          gsap.to(floppy.mesh.rotation, 
            { 
              duration: .8,
              x: ((Math.PI * .5) - 0.75) + movement
            }
          );
       }
    },

    followTilt: (floppy:any, x:number, y:number) => {
      // Go to where the cursor is.
      gsap.to(floppy.mesh.position, 
        { 
          duration: 1,
          z: y,
          x: x,
          onUpdate: () => {
            
            const distanceX = Math.floor(x) - Math.floor(floppy.mesh.position.x);
            const distanceY = Math.floor(y) - Math.floor(floppy.mesh.position.z);
      
            let percentX = distanceX / 40;
            let percentY = distanceY / 40;
            let movementX = percentX * -1.5;
            let movementY = percentY * 1.5;

            gsap.to(floppy.mesh.rotation, 
              { 
                ease: "power2.out",
                duration: .8,
                y: movementX,
                x: ((Math.PI * .5)) + movementY
              }
            );
          },
          onComplete: () => {

          }
        }
      );
    }
  }
  
  types[type](floppy,x,y);
}

export default AnimationTypes;