import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Router, RouteComponentProps, Link } from "@reach/router";
import FloppyStage from './FloppyStage';
import seensoundTexture from './assets/seensounds-uvmap_rotationADAM.png';
import minimeTexture from './assets/minime-uvmap.png';
import minimeNonWrapped from './assets/MiniMe_Section4_01_DT.jpg';

const Standard = (props: RouteComponentProps) =>  {
  const containerEl = useRef();

  useEffect(() => {
    new FloppyStage(containerEl.current, minimeNonWrapped, {
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

  useEffect(() => {
    new FloppyStage(containerEl.current, minimeNonWrapped, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl2.current, minimeNonWrapped, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl3.current, minimeNonWrapped, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl4.current, minimeNonWrapped, {
      ground: false,
      background: false
    });
  }, []);

  return (
    <>
    <div style={{display:'flex', justifyContent: 'flex-end'}}>
      <div style={{ width: '50vw', height: '80vh', overflow: 'hidden'}} ref={containerEl}></div>
    </div>
    <div style={{ width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl2}></div>
    <div style={{ width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl3}></div>
    <div style={{ width: '100vw', height: '80vh', overflow: 'hidden'}} ref={containerEl4}></div>
    </>
  )

}



const Example = () => {

  return (
    <Router>
      <Standard path="/" />
      <Multi path="/multiple" />
    </Router>
  )
  
}

render(<Example/>,
  document.getElementById('root')
);

