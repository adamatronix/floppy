import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Router, RouteComponentProps, Link } from "@reach/router";
import FloppyStage from './FloppyStage';
import FloppyObject from './FloppyObject';
import FloppyTicker from './FloppyTicker';
import FloppyRenderer from './FloppyRenderer';
import TickerTexture from './TickerTexture';
import TickerTextureH from './assets/Mini Me Logo Horizontal.png';
import TickerTextureV from './assets/Mini Me Logo Vertical.png';
import seensoundTexture from './assets/seensounds-uvmap_rotationADAM.png';
import minimeTexture from './assets/minime-uvmap.png';
import minimeNonWrapped from './assets/MiniMe_Section4_01_DT.jpg';
import minimeImage2 from './assets/MiniMe_Section4_02_DT.jpg';
import minimeImage3 from './assets/MiniMe_Section4_03_DT.jpg';

const Standard = (props: RouteComponentProps) =>  {
  const containerEl = useRef();
  const example = useRef<FloppyStage>();

  useEffect(() => {
    
    example.current = new FloppyStage(containerEl.current, new FloppyObject({x:45,y:55.13,z:2}, minimeNonWrapped),{
      ground: false,
      background: false,
      trailEffect: true,
      elastic: true,
      stats: true,
      puncturable: 100,
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

const SlaveMode = (props: RouteComponentProps) => {

  const mainEl = useRef();
  const containerEl = useRef();
  const containerEl2 = useRef();
  const examples = useRef<FloppyStage[]>([]);

  useEffect(()=>{
    examples.current.push(new FloppyStage(containerEl.current, minimeNonWrapped, {x:12,y:14.71,z:3}, {
      ground: false,
      background: false,
      stats: true,
      slaveMode: true,
      elastic: true,
      puncturable: 300
    }));
    
    examples.current.push(new FloppyStage(containerEl2.current, minimeImage2, {x:12,y:14.92,z:3}, {
      ground: false,
      background: false,
      tickerColour: '#FB3B5B',
      stats: true,
      slaveMode: true
    }));

    new FloppyRenderer(mainEl.current,examples.current);
  },[])

  
  return (
    <>
      <div style={{ position: 'absolute', left: '0', width: '100%', height: '100vh', overflow: 'hidden'}} ref={mainEl}></div>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl2}></div>
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
    <Router>
      <Standard path="/" />
      <Multi path="/multiple" />
      <SlaveMode path="/slave"/> 
      <Ticker path="/tickertexture" />
    </Router>
  )
  
}

render(<Example/>,
  document.getElementById('root')
);

