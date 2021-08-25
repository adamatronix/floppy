import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import FloppyStage from './FloppyStage';

const Example = () => {

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

render(<Example/>,
  document.getElementById('root')
);

