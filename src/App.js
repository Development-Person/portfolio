import './App.css';
import GridComponent from './components/Grid';

function App() {
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

  return (
    <div className='App'>
      <GridComponent width={width} height={height} />
    </div>
  );
}

export default App;
