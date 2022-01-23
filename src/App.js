import './App.css';
import GridComponent from './components/Grid';
import { placeElementsIntoGridSpots } from './functions/gridPlacement';
import { useEffect, useState } from 'react';

function App() {
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

  const [coordinatesArray, setCoordinatesArray] = useState();

  // determining number of rows based on screen size
  const columnsDivisor = height > 740 ? 120 : 60;
  const columns = Array.from(Array(Math.floor(height / columnsDivisor)).keys());
  const rows = Array.from(Array(Math.floor(width / 200)).keys());

  //placing all elements into grid on page load
  useEffect(() => {
    setCoordinatesArray(
      placeElementsIntoGridSpots(rows.length, columns.length)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <GridComponent
        coordinatesArray={coordinatesArray}
        rows={rows}
        columns={columns}
        width={width}
        height={height}
      />
    </div>
  );
}

export default App;
