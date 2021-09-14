import logoVertical from './assets/Mini Me Logo Vertical.png';
import logoHorizontal from './assets/Mini Me Logo Horizontal.png';

interface Origin {
  x: number;
  y: number;
  isFlanked: boolean;
}

class TickerTexture {
  imageTexture:HTMLImageElement;
  canvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  curPosition:Origin = {x:null,y:null, isFlanked: false};
  imageArray:any = new Array();
  orientation:string;
  tickerColour:string;
  requestID:number;
  textLoaded:boolean = false;

  constructor(orientation:string, ticketColour:string) {
   const self = this;
   this.orientation = orientation;
   this.tickerColour = ticketColour;
   this.canvas = document.createElement('canvas');
   //document.body.appendChild(this.canvas);
   this.ctx = this.canvas.getContext('2d'); 
   this.ctx.canvas.width =  this.orientation === 'vertical' ? 200 : 1400;
   this.ctx.canvas.height = this.orientation === 'vertical' ? 1400 : 200;
   this.ctx.fillStyle = this.tickerColour;
   this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

   let x = this.orientation === 'vertical' ? 0 : 0 - (2575 - self.canvas.width);
   let y = this.orientation === 'vertical' ? 0 - (2575 - self.canvas.height) : 0;
   this.imageArray.push({x: x, y: y, isFlanked: false});
   
   this.imageTexture = new Image();
   this.imageTexture.src = this.orientation === 'vertical' ? logoVertical : logoHorizontal;
   this.imageTexture.onload = function(){
    let width = self.orientation === 'vertical' ? 2575 * self.imageTexture.width / self.imageTexture.height : 2575;
    let height = self.orientation === 'vertical' ? 2575 : 2575 *  self.imageTexture.height / self.imageTexture.width;
     self.ctx.drawImage(self.imageTexture, self.imageArray[0].x, self.imageArray[0].y, width, height);
     self.textLoaded = true;
     self.startRender();

   }

   
  }

  update = () => {
    this.requestID = requestAnimationFrame(this.update);
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = this.tickerColour;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if(this.textLoaded) {
      this.imageArray.forEach((image:Origin, index:number) => {
        let refAxis = this.orientation === 'vertical' ? image.y : image.x;
        let edge = this.orientation === 'vertical' ? this.canvas.height : this.canvas.width;
        if(refAxis > 0 && !image.isFlanked) {
          let x = this.orientation === 'vertical' ? 0 : 0 - 2575;
          let y = this.orientation === 'vertical' ? 0 - 2575 : 0;
          this.imageArray.push({x: x, y: y, isFlanked: false})
          image.isFlanked = true;
        }
   
        if(refAxis > edge) {
          this.imageArray.splice(index,1);
        }
      });
  
      this.imageArray.forEach((image:Origin) => {
        let width = this.orientation === 'vertical' ? 2575 * this.imageTexture.width / this.imageTexture.height : 2575;
        let height = this.orientation === 'vertical' ? 2575 : 2575 * this.imageTexture.height / this.imageTexture.width;
        this.ctx.drawImage(this.imageTexture, image.x, image.y, width, height);
  
        if(this.orientation === 'vertical') {
          image.y += 4;
        } else {
          image.x += 4;
        }
        
      });
    }
    
  }

  startRender = () => {
    this.update();
  }

  stopRender = () => {
    cancelAnimationFrame(this.requestID);
    this.requestID = undefined;
  }
}

export default TickerTexture;