import logo from './logo.svg';
import './App.css';
import LineComponent from './components/Line';
import CardComponent from './components/Card';
import DotComponent from './components/Dot';
import ScrollButton from './components/ScrollButton';
import { data } from './content/project_descriptions.js';

function App() {
  return (
    <div className='App'>
      <header className='App-body'>
        <ScrollButton
          direction={-1}
          style={{
            position: 'fixed',
            left: 0,
          }}
        />
        <LineComponent />
        <div className='dot-container'>
          {data.map((element, index) => {
            const position = index === 0 ? 750 : 750 + index * 1000;

            return (
              <DotComponent
                key={element.name}
                position={position}
                info={element}
              />
            );
          })}
        </div>
        <ScrollButton
          direction={1}
          style={{
            position: 'sticky',
            right: 0,
          }}
        />
      </header>
    </div>
  );
}

export default App;
