import './App.css';
import GridComponent from './components/Grid';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import { data } from './content/project_descriptions';
import { useEffect, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);

  function updateScore() {
    setScore(score + 1);
  }

  return (
    <div className='App'>
      <HeaderComponent score={score} data={data} />
      <GridComponent updateScore={updateScore} data={data} />
      <FooterComponent />
    </div>
  );
}

export default App;
