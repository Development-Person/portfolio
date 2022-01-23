import { useState } from 'react';

function DotComponent(props) {
  // const [visibility, setVisibility] = useState('hidden');
  // const [opacity, setOpacity] = useState('0%');

  // function toggleDiv() {
  //   setVisibility(visibility === 'hidden' ? 'visible' : 'hidden');
  //   setOpacity(visibility === 'hidden' ? '100%' : '0%');
  // }

  const style = {
    // left: `700px`,
    // top: `-500px`,
    left: `${props.positionX}px`,
    top: `${props.positionY}px`,
    // visibility: visibility,
    // opacity: opacity,
    // transition: 'all 500ms ease-in',
  };

  return (
    <>
      <div className='dot' style={style}>
        <div className='large-dot'></div>
        <div className='small-dot'></div>
      </div>
    </>
  );
}

export default DotComponent;
