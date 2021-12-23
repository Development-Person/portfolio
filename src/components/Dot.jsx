import { useState } from 'react';

function DotComponent(props) {
  const [visibility, setVisibility] = useState('hidden');
  const [opacity, setOpacity] = useState('0%');

  function toggleDiv() {
    setVisibility(visibility === 'hidden' ? 'visible' : 'hidden');
    setOpacity(visibility === 'hidden' ? '100%' : '0%');
  }

  const style = {
    left: `${props.position}px`,
    visibility: visibility,
    opacity: opacity,
    transition: 'all 500ms ease-in',
  };

  return (
    <>
      <div className='info-card' style={style}>
        <div onClick={toggleDiv} className='info-card-close-button'>
          x
        </div>
        <h3 className='info-card-heading'>{props.info.name}</h3>
        <div className='info-card-content'>{props.info.description}</div>
      </div>

      <div
        onClick={toggleDiv}
        className='large-dot'
        style={{ left: `${props.position}px` }}></div>
      <div
        onClick={toggleDiv}
        className='small-dot'
        style={{ left: `${props.position + 15}px` }}></div>

      <div className='gif-container' style={style}>
        <div className='gif-card' style={style}></div>
        <div className='learnings' style={style}>
          <ul style={style}>
            {props.info.learnings.map((element) => {
              return <li key={element}>{element}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
