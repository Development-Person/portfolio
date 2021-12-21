import logo from './logo.svg';
import './App.css';
import LineComponent from './components/Line';
import CardComponent from './components/Card';
import DotComponent from './components/Dot';
import ScrollButton from './components/ScrollButton';

function App() {
  const testArray = ['Test1', 'Test2', 'Test3', 'Test4'];

  const scrollStyleRight = {
    position: 'sticky',
    right: 0,
  };

  const scrollStyleLeft = {
    position: 'fixed',
    left: 0,
  };

  return (
    <div className='App'>
      <header className='App-body'>
        <ScrollButton direction={-1} style={scrollStyleLeft} />
        <LineComponent />
        <div className='dot-container'>
          {testArray.map((element, index) => {
            const position = index === 0 ? 750 : 750 + index * 1000;
            const orangeStyle = {
              height: '60px',
              width: '60px',
              backgroundColor: 'orangered',
              zIndex: '1',
              left: `${position}px`,
            };

            const grayStyle = {
              height: '30px',
              width: '30px',
              backgroundColor: '#282c34',
              zIndex: '2',
              left: `${position + 15}px`,
            };

            return (
              <>
                <DotComponent
                  key={`${testArray[index]}-orange`}
                  name={testArray[index]}
                  style={orangeStyle}
                  info={element}
                />

                <DotComponent
                  key={`${testArray[index]}-gray`}
                  name={testArray[index]}
                  style={grayStyle}
                  info={element}
                />
              </>
            );
          })}
        </div>
        <ScrollButton direction={1} style={scrollStyleRight} />
      </header>
    </div>
  );
}

export default App;
