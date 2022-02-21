import './App.css';
import GridComponent from './components/Grid';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import { data } from './content/project_descriptions';
import { useState } from 'react';

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
      <HeaderComponent score={score} data={data} />
      <GridComponent
        updateScore={updateScore}
        resetScore={resetScore}
        data={data}
      />
      <FooterComponent />
    </div>
  );
}

export default App;
