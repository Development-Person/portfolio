import './App.css';
import GridComponent from './components/Grid';
import HeadingComponent from './components/Heading';
import { getGridAllCoordinates } from './functions/gridPlacement';
import { useEffect, useState } from 'react';
import { data } from './content/project_descriptions';

function App() {
  const height = window.screen.availHeight - 200;
  const width = window.screen.availWidth - 100;

  const [coordinatesArray, setCoordinatesArray] = useState();

  // projects data
  const projectsArrayLength = data.length;

  // determining number of rows based on screen size
  const columnsDivisor = height > 740 ? 100 : 100;
  const columns = Array.from(Array(Math.floor(height / columnsDivisor)).keys());
  const rows = Array.from(Array(Math.floor(width / 100)).keys());

  //placing all elements into grid on page load
  useEffect(() => {
    setCoordinatesArray(
      getGridAllCoordinates(rows.length, columns.length, projectsArrayLength)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <HeadingComponent />
      <div className='game' style={{ height: height + 50, width: width + 25 }}>
        <GridComponent
          coordinatesArray={coordinatesArray}
          projectsArrayLength={projectsArrayLength}
          rows={rows}
          columns={columns}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}

export default App;
