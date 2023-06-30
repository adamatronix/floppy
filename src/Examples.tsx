import React, { useRef, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Router, RouteComponentProps, Link } from "@reach/router";
import styled from 'styled-components';
import loadTextures from './utils/loadTextures';
import FloppyStage from './FloppyStage';
import FloppyAlbum from './FloppyAlbum';
import FloppyObject from './FloppyObject';
import FloppyTicker from './FloppyTicker';
import FloppyRenderer from './FloppyRenderer';
import TickerTexture from './TickerTexture';
import TickerTextureH from './assets/Mini Me Logo Horizontal.png';
import TickerTextureV from './assets/Mini Me Logo Vertical.png';
import minimeNonWrapped from './assets/MiniMe_Section4_01_DT.jpg';
import manualImg from './assets/Desktop - 59.jpg';
import measImg from './assets/Desktop - 74 2.jpg';
import manualabstractImg from './assets/Group 625903.jpg';
import botanicsImg from './assets/Group 625957.jpg';
import horseyImg from './assets/Mask Group.jpg';
import carImg from './assets/mbc38528 1.jpg';
import transFlopImg from './assets/Group 625953.png';
import SeenSounds from './assets/Parq_1.jpg';
import Seensounds2 from './assets/Moses_1.jpg';
import Seensounds2Placeholder from './assets/Moses_1-placeholder.jpg';
import AlbumShape from 'url:./assets/floppy.glb';


const Standard = (props: RouteComponentProps) =>  {
  const containerEl = useRef();
  const example = useRef<FloppyStage>();
  const floppy = useRef<FloppyObject>();

  useEffect(() => {
    floppy.current = new FloppyObject({x:45,y:55.13,z:2}, minimeNonWrapped);
    example.current = new FloppyStage(containerEl.current, floppy.current,{
      ground: false,
      background: false,
      trailEffect: true,
      elastic: true,
      stats: true,
      puncturable: 100,
      animation: 'followTilt'
    });
    
  }, []);

  const toggle = () => {
    if(example.current.requestId) {
      example.current.stopRender();
    } else {
      example.current.startRender();
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl} onClick={toggle}></div>
  )

}


const AlbumWrapper = styled.div`
   width: 100vw; 
   height: 80vh; 
   margin: 100px 0 0;
   position: relative;
`

const AlbumInner = styled.div`
  position: absolute;
  height: calc(100% + 200px);
  margin-top: -100px;
  width: 100%;
`

const Album = (props: RouteComponentProps) =>  {
  const containerEl = useRef();
  const example = useRef<FloppyStage>();
  const floppy = useRef<FloppyAlbum>();

  useEffect(() => {
    floppy.current = new FloppyAlbum(Seensounds2,1.28,1394,1680, Seensounds2Placeholder);
    example.current = new FloppyStage(containerEl.current, floppy.current,{
      requireCallback: true,
      ground: false,
      background: false,
      trailEffect: false,
      elastic: false,
      stats: true,
      animation: 'rotate',
      manual: true,
      autoRotate: 6
    });
    example.current.startRender();

    return () => {
      example.current.destroy();
      example.current = null;
      floppy.current = null;
    }
  }, []);


  return (
    <AlbumWrapper>
      <AlbumInner ref={containerEl}>
      </AlbumInner>
    </AlbumWrapper>
  )

}

const MenuItem = styled.div`
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 60px;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 20px;
`

const MenuWrapper = styled.div`
  position: relative;
  padding: 800px 0 0;
  z-index: 1;
`

const CanvasWrapper = styled.div<{show:boolean}>`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity .2s ease;
`

const StandardWithScroll = (props: RouteComponentProps) =>  {
  const containerEl = useRef();
  const example = useRef<FloppyStage>();
  const floppy = useRef<FloppyObject>();
  const texturesStore = useRef<any>();
  const [ ShowCanvas, setShowCanvas ] = useState(false);

  const items = [
    {
      label: 'Punani Buffett',
      img: 'https://images.prismic.io/adamatronix/0ead1025-54d7-4bae-b6e7-e2bfb5ec8fe8_Desktop+-+59.jpg?auto=compress%2Cformat&fm=auto&maxWidth=1000&q=50',
      width: 700,
      height: 437
    },
    {
      label: 'Punani Buffett',
      img: 'https://images.prismic.io/adamatronix/2fc042cc-86ef-4f04-8b02-8c477e6dd3c6_Mask+Group.jpg?auto=compress%2Cformat&fm=auto&maxWidth=1000&q=50',
      width: 600,
      height: 740
    },
    {
      label: 'Punani Buffett',
      img: measImg,
      width: 700,
      height: 438
    },
    {
      label: 'Punani Buffett',
      img: botanicsImg,
      width: 600,
      height: 740
    },
    {
      label: 'Punani Buffett',
      img: horseyImg,
      width: 600,
      height: 740
    },
    {
      label: 'Punani Buffett',
      img: carImg,
      width: 900,
      height: 506
    },
    {
      label: 'Punani Buffett',
      img: manualImg,
      width: 700,
      height: 437
    },
    {
      label: 'Punani Buffett',
      img: manualabstractImg,
      width: 600,
      height: 740
    },
    {
      label: 'Punani Buffett',
      img: measImg,
      width: 700,
      height: 438
    },
    {
      label: 'Punani Buffett',
      img: botanicsImg,
      width: 600,
      height: 740
    },
    {
      label: 'Punani Buffett',
      img: horseyImg,
      width: 600,
      height: 740
    },
    {
      label: 'Punani Buffett',
      img: carImg,
      width: 900,
      height: 506
    },
  ]

  useEffect(() => {

    if(containerEl.current) {
      const promisesArray = loadTextures(items);

      Promise.all(promisesArray).then((textures)=>{
        texturesStore.current = textures;


        floppy.current = new FloppyObject({x:18,y:18,z:0}, texturesStore.current[0]);

    
        example.current = new FloppyStage(containerEl.current, floppy.current,{
          ground: false,
          background: false,
          trailEffect: true,
          elastic: true,
          stats: false,
          puncturable: 100,
          animation: 'restrictToX'
        });

        example.current.startRender();
      })
    }
    
    
  }, []);

  const onMouseEnter = () => {
    example.current.renderer.clear();
    setShowCanvas(true)
  }

  const onMouseLeave = () => {
    setShowCanvas(false)
  }

  const itemEnter = (index:number,width:number,height:number) => {
    floppy.current.updateMaterial(texturesStore.current[index],width,height);
  }

  return (
    <div>
      <MenuWrapper>
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          { items.map((item,i) => {
            return (
              <MenuItem onMouseEnter={()=>itemEnter(i,item.width,item.height)}>{item.label}</MenuItem>
            )
          })}
        </div>
      </MenuWrapper>
      <CanvasWrapper show={ShowCanvas} ref={containerEl} />
    </div>
    
  )

}

const Multi = (props: RouteComponentProps) =>  {
  const mainEl = useRef();
  const containerEl = useRef();
  const containerEl2 = useRef();
  const containerEl3 = useRef();
  const containerEl4 = useRef();
  const containerEl5 = useRef();
  const containerEl6 = useRef();
  const containerEl7 = useRef();
  const containerEl8 = useRef();
  const examples = useRef<FloppyStage[]>([]);

  useEffect(() => {
    examples.current.push(new FloppyStage(containerEl.current, new FloppyTicker({x:12,y:14.70,z:2}, minimeNonWrapped,TickerTextureH,TickerTextureV, '#FFF'), {
      ground: false,
      background: false,
      stats: true,
      trailEffect: true,
      elastic: true
    }));
    

    return function cleanup() {
      examples.current.forEach((example) => {
        example.destroy();
      });
    };

  }, []);

  const toggle = (index:number) => {
    const example = examples.current[index];
    if(example.requestId) {
      example.stopRender();
    } else {
      example.startRender();
    }
  }

  return (
    <>
    <div style={{ position: 'absolute', left: '0', width: '100%', height: '100vh', overflow: 'hidden'}} ref={mainEl}></div>
    <div style={{display:'flex'}}>
      <div onClick={()=>toggle(0)} style={{ position: 'relative', width: '40vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
      <div onClick={()=>toggle(1)} style={{ position: 'relative', width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl2}></div>
    </div>
    <div style={{display:'flex'}}>
      <div onClick={()=>toggle(6)} style={{ position: 'relative', width: '40vw', height: '100vh', overflow: 'hidden'}} ref={containerEl7}></div>
      <div onClick={()=>toggle(7)} style={{ position: 'relative', width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl8}></div>
    </div>
    
    <div onClick={()=>toggle(2)} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl3}></div>
    <div style={{display:'flex', justifyContent: 'flex-start'}}>
      <div onClick={()=>toggle(3)} style={{ position: 'relative', width: '40vw', height: '100vh', overflow: 'hidden'}} ref={containerEl4}></div>
    </div>
    <div onClick={()=>toggle(4)} style={{ position: 'relative', width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl5}></div>
    <div onClick={()=>toggle(5)} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl6}></div>
    </>
  )

}

const Ticker = (props: RouteComponentProps) =>  {

  useEffect(() => {
    new TickerTexture('vertical', "#FFF", TickerTextureV);
  }, []);

  return (
    <></>
  )

}



const Example = () => {
  return (
    <Album />
  )
  
}

render(<Example/>,
  document.getElementById('root')
);

