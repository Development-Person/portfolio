import { useState } from 'react';
import './App.css';
import GridComponent from './components/Grid';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import { data } from './content/project_descriptions';
import { isTouchScreenDevice } from './functions/isTouchScreenDevice';

function App() {
  const [score, setScore] = useState(0);

  function updateScore() {
    setScore(score + 1);
  }

  function resetScore() {
    setScore(0);
  }

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <div className='App'>
      {isTouchScreenDevice() ? '' : <div className='cursor'></div>}
      <HeaderComponent score={score} data={data} />
      <GridComponent
        isTouchScreenDevice={isTouchScreenDevice}
        updateScore={updateScore}
        resetScore={resetScore}
        data={data}
      />
      <FooterComponent />
    </div>
  );
}

export default App;
