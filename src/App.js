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
