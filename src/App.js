import './App.css';
import GridComponent from './components/Grid';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import { data } from './content/project_descriptions';
import { useEffect, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);

  function getDiscoveredElements() {
    return document.getElementsByClassName('dot-discovered').length;
  }

  const hiddens = document.getElementsByClassName('dot-hidden');

  for (const hidden of hiddens) {
    hidden.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('hi!');
      setScore(getDiscoveredElements());
    });
  }

  return (
    <div className='App'>
      <HeaderComponent score={score} data={data} />
      <GridComponent data={data} />
      <FooterComponent />
    </div>
  );
}

export default App;
