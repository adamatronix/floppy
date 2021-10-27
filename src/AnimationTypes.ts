import { gsap } from "gsap";
import FloppyObject from './FloppyObject';
import { findPointBetweenTwo } from './utils/findPointBetweenTwo';
import { distanceOfLine } from './utils/distanceOfLine';


export const AnimationTypes = (floppy:FloppyObject, x:number, y:number, type:string) => {

  const types:any = {
    pivotRotate: (floppy:FloppyObject, x:number, y:number) => {

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
    }
  }
  
  types[type](floppy,x,y);
}

export default AnimationTypes;