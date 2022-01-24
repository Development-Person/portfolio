import './App.css';
import GridComponent from './components/Grid';
import { getGridAllCoordinates } from './functions/gridPlacement';
import { useEffect, useState } from 'react';
import { data } from './content/project_descriptions';

function App() {
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

  const [coordinatesArray, setCoordinatesArray] = useState();

  // projects data
  const projectsArrayLength = data.length;

  // determining number of rows based on screen size
  const columnsDivisor = height > 740 ? 120 : 60;
  const columns = Array.from(Array(Math.floor(height / columnsDivisor)).keys());
  const rows = Array.from(Array(Math.floor(width / 200)).keys());

  //placing all elements into grid on page load
  useEffect(() => {
    setCoordinatesArray(
      getGridAllCoordinates(rows.length, columns.length, projectsArrayLength)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <GridComponent
        coordinatesArray={coordinatesArray}
        projectsArrayLength={projectsArrayLength}
        rows={rows}
        columns={columns}
        width={width}
        height={height}
      />
    </div>
  );
}

export default App;
