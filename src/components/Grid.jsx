import { Container, Row, Col } from 'react-bootstrap';
import DotComponent from './Dot';
import { useEffect, useState, useCallback } from 'react';
import { getGridAllCoordinates } from '../functions/gridPlacement';
import { animationSelector } from '../functions/animationSelector';

function GridComponent({ data, updateScore, resetScore, isTouchScreenDevice }) {
  function screenDimensionsSetter() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };
  }

  function gridDimensionsSetter() {
    return {
      gridWidth:
        screenDimensions.screenWidth < 500
          ? screenDimensions.screenWidth - 50
          : screenDimensions.screenWidth - 200,
      gridHeight:
        screenDimensions.screenHeight < 1000
          ? screenDimensions.screenHeight - 200
          : screenDimensions.screenHeight - 400,
    };
  }

  function divisorsSetter() {
    return {
      rowsDivisor: screenDimensions.screenWidth >= 912 ? 120 : 105,
      columnsDivisor: screenDimensions.screenHeight > 745 ? 120 : 100,
    };
  }

  function gridSetter() {
    return {
      columns: Array.from(
        Array(
          Math.floor(gridDimensions.gridHeight / divisors.columnsDivisor)
        ).keys()
      ),
      rows: Array.from(
        Array(
          Math.floor(gridDimensions.gridWidth / divisors.rowsDivisor)
        ).keys()
      ),
    };
  }

  //get screen width and height
  const [screenDimensions, setScreenDimensions] = useState(
    screenDimensionsSetter()
  );

  //1. build a grid based on screen width and height
  //1a. remove some width and height to make sure the squares stay inside the large square
  const [gridDimensions, setGridDimensions] = useState(gridDimensionsSetter());

  //1b. set a divisor based on the screen width and height, larger width/height will be diveded by a
  //larger number, therefore yielding less columns/rows than they would otherwise
  const [divisors, setDivisors] = useState(divisorsSetter());

  //1c. creating a grid based on the dimensions of the screen and the divisor
  //the bigger the screen the bigger the grid, and the more squares.
  //the goal is to end up a grid with the same density of squares no matter the size.
  const [grid, SetGrid] = useState(gridSetter());

  const [coordinatesArray, setCoordinatesArray] = useState();
  const [animationsArray, setAnimationsArray] = useState();

  // projects data
  const [projectsArrayLength] = useState(data.length);

  //auto-resizing function - this gets called every time the resize event listener is triggered
  const setUp = useCallback(() => {
    // new grid means new placement, so new score
    resetScore();

    setGridDimensions(gridDimensionsSetter());

    setDivisors(divisorsSetter());

    SetGrid(gridSetter());

    setCoordinatesArray(
      getGridAllCoordinates(
        grid.rows.length,
        grid.columns.length,
        projectsArrayLength
      )
    );

    setAnimationsArray(animationSelector(projectsArrayLength));
    // disabled so resetScore does not trigger rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    divisors.columnsDivisor,
    divisors.rowsDivisor,
    grid.columns.length,
    grid.rows.length,
    gridDimensions.gridHeight,
    gridDimensions.gridWidth,
    projectsArrayLength,
    screenDimensions.screenHeight,
    screenDimensions.screenWidth,
  ]);

  //placing all elements into grid on page load
  const cursor = document.querySelector('.cursor');

  useEffect(() => {
    //setup is called to create a grid that responds to the screen size
    setUp();

    //resize function just resets the screen dimensions, which calls the setup function
    function handleResize() {
      setScreenDimensions({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    }

    //event listener is added
    window.addEventListener('resize', handleResize);

    return () => {
      //event listener is cleaned up if navigates away from page (not an issue here but good practice)
      window.removeEventListener('resize', handleResize);
    };
  }, [setUp]);

  const style = {
    width: `${gridDimensions.gridWidth}px`,
    height: `${gridDimensions.gridHeight}px`,
  };

  document.addEventListener('mousemove', (e) => {
    if (cursor) {
      cursor.setAttribute(
        'style',
        'top: ' + (e.pageY - 30) + 'px; left: ' + (e.pageX - 30) + 'px;'
      );
    }
  });

  document.addEventListener('click', () => {
    if (cursor) {
      cursor.classList.add('expand');

      setTimeout(() => {
        cursor.classList.remove('expand');
      }, 500);
    }
  });

  function handleClick(discovered = false) {
    if (discovered === true) {
      cursor.classList.add('expand-discover');

      setTimeout(() => {
        cursor.classList.remove('expand-discover');
      }, 500);
    }

    if (discovered === false) {
      cursor.classList.add('expand');

      setTimeout(() => {
        cursor.classList.remove('expand');
      }, 500);
    }
  }

  function addDiscoverAnimation(discovered = false) {
    if (isTouchScreenDevice()) {
      return;
    } else {
      document.removeEventListener('click', handleClick);

      if (discovered === true) {
        document.addEventListener('click', handleClick(true));
      }

      if (discovered === false) {
        document.addEventListener('click', handleClick(false));
      }
    }
  }

  return (
    <>
      <div
        className='game mt-4'
        style={{
          height: gridDimensions.gridHeight + 1,
          width: gridDimensions.gridWidth + 1,
        }}>
        <Container fluid className='grid-container' style={style}>
          {grid.rows.map((_el, i) => {
            const row = `R${i + 1}`;
            return (
              <Row key={row} id={row}>
                {grid.columns.map((_el, j) => {
                  const column = `${row}C${j + 1}`;
                  return (
                    <Col
                      key={column}
                      style={{ display: 'flex', justifyContent: 'center' }}>
                      {coordinatesArray && coordinatesArray.includes(column) ? (
                        <div id={column} className='full box p-3 m-3'>
                          <DotComponent
                            data={data[coordinatesArray.indexOf(column)]}
                            key={column}
                            updateScore={updateScore}
                            addDiscoverAnimation={addDiscoverAnimation}
                            animation={
                              animationsArray[coordinatesArray.indexOf(column)]
                            }
                          />
                        </div>
                      ) : (
                        <div id={column} className='empty box p-3 m-3'>
                          {' '}
                        </div>
                      )}
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </Container>
      </div>
    </>
  );
}

export default GridComponent;
