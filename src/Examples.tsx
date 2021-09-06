import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Router, RouteComponentProps, Link } from "@reach/router";
import FloppyStage from './FloppyStage';

const Standard = (props: RouteComponentProps) =>  {
  const containerEl = useRef();

  useEffect(() => {
    new FloppyStage(containerEl.current, {
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
    new FloppyStage(containerEl.current, {
      ground: false,
      background: false
    });

    new FloppyStage(containerEl2.current, {
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

