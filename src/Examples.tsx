import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';

const Example = () => {

  const containerEl = useRef();

  useEffect(() => {

  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>Test</div>
  )
}

render(<Example/>,
  document.getElementById('root')
);

