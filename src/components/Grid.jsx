import { Container, Row, Col } from 'react-bootstrap';
import DotComponent from './Dot';
import { useEffect, useState, useCallback } from 'react';
import { getGridAllCoordinates } from '../functions/gridPlacement';
import { animationSelector } from '../functions/animationSelector';

function GridComponent({ data, updateScore, resetScore }) {
  const [screenDimensions, setScreenDimensions] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });
  const [gridDimensions, setGridDimensions] = useState({
    gridWidth:
      screenDimensions.screenWidth < 500
        ? screenDimensions.screenWidth - 50
        : screenDimensions.screenWidth - 200,
    gridHeight:
      screenDimensions.screenHeight < 700
        ? screenDimensions.screenHeight - 200
        : screenDimensions.screenHeight - 400,
  });
  const [coordinatesArray, setCoordinatesArray] = useState();
  const [animationsArray, setAnimationsArray] = useState();
  const [divisors, setDivisors] = useState({
    rowsDivisor: screenDimensions.screenWidth >= 912 ? 120 : 100,
    columnsDivisor: screenDimensions.screenHeight > 740 ? 120 : 100,
  });
  const [grid, SetGrid] = useState({
    columns: Array.from(
      Array(
        Math.floor(gridDimensions.gridHeight / divisors.columnsDivisor)
      ).keys()
    ),
    rows: Array.from(
      Array(Math.floor(gridDimensions.gridWidth / divisors.rowsDivisor)).keys()
    ),
  });

  // projects data
  const [projectsArrayLength] = useState(data.length);

  //auto-resizing function
  const setUp = useCallback(() => {
    resetScore();

    setGridDimensions({
      gridWidth:
        screenDimensions.screenWidth < 500
          ? screenDimensions.screenWidth - 50
          : screenDimensions.screenWidth - 200,
      gridHeight:
        screenDimensions.screenHeight < 700
          ? screenDimensions.screenHeight - 200
          : screenDimensions.screenHeight - 400,
    });

    setDivisors({
      rowsDivisor: screenDimensions.screenWidth >= 912 ? 120 : 100,
      columnsDivisor: screenDimensions.screenHeight > 740 ? 120 : 100,
    });

    SetGrid({
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
    });

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
  useEffect(() => {
    setUp();

    function handleResize() {
      setScreenDimensions({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setUp]);

  const style = {
    width: `${gridDimensions.gridWidth}px`,
    height: `${gridDimensions.gridHeight}px`,
  };

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
                      <div id={column} className='empty box p-3 m-3'>
                        {coordinatesArray &&
                        coordinatesArray.includes(column) ? (
                          <DotComponent
                            key={column}
                            updateScore={updateScore}
                            animation={
                              animationsArray[coordinatesArray.indexOf(column)]
                            }
                          />
                        ) : (
                          ''
                        )}
                      </div>
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
