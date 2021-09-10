import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Router, RouteComponentProps, Link } from "@reach/router";
import FloppyStage from './FloppyStage';
import TickerTexture from './TickerTexture';
import seensoundTexture from './assets/seensounds-uvmap_rotationADAM.png';
import minimeTexture from './assets/minime-uvmap.png';
import minimeNonWrapped from './assets/MiniMe_Section4_01_DT.jpg';
import minimeImage2 from './assets/MiniMe_Section4_02_DT.jpg';
import minimeImage3 from './assets/MiniMe_Section4_03_DT.jpg';

const Standard = (props: RouteComponentProps) =>  {
  const containerEl = useRef();

  useEffect(() => {
    new FloppyStage(containerEl.current, minimeNonWrapped, {x:12,y:14.70,z:3}, {
      ground: false,
      background: false,
      trailEffect: false
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
  )

}

const Multi = (props: RouteComponentProps) =>  {
  const containerEl = useRef();
  const containerEl2 = useRef();
  const containerEl3 = useRef();
  const containerEl4 = useRef();
  const containerEl5 = useRef();
  const containerEl6 = useRef();

  useEffect(() => {
    new FloppyStage(containerEl.current, minimeNonWrapped, {x:12,y:14.71,z:3}, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl2.current, minimeImage2, {x:12,y:14.92,z:3}, {
      ground: false,
      background: false,
      tickerColour: '#FB3B5B'
    });

    const test = new FloppyStage(containerEl3.current, minimeImage3, {x:13,y:15.98,z:3}, {
      ground: false,
      background: false,
      tickerColour: '#F57491'
    });

    new FloppyStage(containerEl4.current, minimeNonWrapped, {x:12,y:14.71,z:3}, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl5.current, minimeImage2, {x:12,y:14.92,z:3}, {
      ground: false,
      background: false,
      tickerColour: '#FB3B5B'
    });

    new FloppyStage(containerEl6.current, minimeImage3, {x:13,y:15.98,z:3}, {
      ground: false,
      background: false,
      tickerColour: '#F57491'
    });

    return function cleanup() {
      test.destroy();
    };

  }, []);

  return (
    <>
    <div style={{display:'flex', justifyContent: 'flex-end'}}>
      <div style={{ width: '40vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
    </div>
    <div style={{ width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl2}></div>
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl3}></div>
    <div style={{display:'flex', justifyContent: 'flex-start'}}>
      <div style={{ width: '40vw', height: '100vh', overflow: 'hidden'}} ref={containerEl4}></div>
    </div>
    <div style={{ width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl5}></div>
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl6}></div>
    </>
  )

}

const Ticker = (props: RouteComponentProps) =>  {

  useEffect(() => {
    new TickerTexture('vertical', "#FFF");
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
      <Ticker path="/tickertexture" />
    </Router>
  )
  
}

render(<Example/>,
  document.getElementById('root')
);

