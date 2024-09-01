import React from 'react';
import SomeComponent from './Home';
import MatrixEffect from './Matrix';

const MainComponent = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <MatrixEffect />
      <SomeComponent />
    </div>
  );
};

export default MainComponent;
