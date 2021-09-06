import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Router, RouteComponentProps, Link } from "@reach/router";
import FloppyStage from './FloppyStage';
import seensoundTexture from './assets/seensounds-uvmap_rotationADAM.png';
import minimeTexture from './assets/minime-uvmap.png';

const Standard = (props: RouteComponentProps) =>  {
  const containerEl = useRef();

  useEffect(() => {
    new FloppyStage(containerEl.current, minimeTexture, {
      ground: false,
      background: false
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
  )

}

const Multi = (props: RouteComponentProps) =>  {
  const containerEl = useRef();
  const containerEl2 = useRef();

  useEffect(() => {
    new FloppyStage(containerEl.current,minimeTexture, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl2.current,minimeTexture, {
      ground: false,
      background: false
    });
  }, []);

  return (
    <>
    <div style={{ width: '100vw', height: '50vh', overflow: 'hidden'}} ref={containerEl}></div>
    <div style={{ width: '100vw', height: '50vh', overflow: 'hidden'}} ref={containerEl2}></div>
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

