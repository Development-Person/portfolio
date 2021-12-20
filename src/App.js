import logo from './logo.svg';
import './App.css';
import LineComponent from './components/Line';
import CardComponent from './components/Card';
import ScrollButton from './components/ScrollButton';

function App() {
  const testArray = ['Test1', 'Test2', 'Test3', 'Test4'];

  return (
    <div className='App'>
      <header className='App-body'>
        <LineComponent />
        <div className='card-container'>
          {testArray.map((element, index) => {
            const position = index * 1000;
            const style = {
              left: `${position}px`,
            };

            return (
              <CardComponent
                key={testArray[index]}
                name={testArray[index]}
                style={style}
              />
            );
          })}
        </div>
        <ScrollButton />
      </header>
    </div>
  );
}

export default App;
