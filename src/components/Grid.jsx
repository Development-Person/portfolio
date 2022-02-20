import { Container, Row, Col } from 'react-bootstrap';
import DotComponent from './Dot';
import { useEffect, useState } from 'react';
import { getGridAllCoordinates } from '../functions/gridPlacement';
import { animationSelector } from '../functions/animationSelector';

function GridComponent({ data, updateScore }) {
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;
  const [coordinatesArray, setCoordinatesArray] = useState();
  const [animationsArray, setAnimationsArray] = useState();

  // projects data
  const projectsArrayLength = data.length;

  const gridWidth = screenWidth < 500 ? screenWidth - 50 : screenWidth - 200;
  const gridHeight =
    screenHeight < 700 ? screenHeight - 200 : screenHeight - 400;

  // determining number of rows based on screen size
  const rowsDivisor = screenWidth >= 912 ? 120 : 100;
  const columnsDivisor = screenHeight > 740 ? 120 : 100;
  const columns = Array.from(
    Array(Math.floor(gridHeight / columnsDivisor)).keys()
  );
  const rows = Array.from(Array(Math.floor(gridWidth / rowsDivisor)).keys());

  //placing all elements into grid on page load
  useEffect(() => {
    setCoordinatesArray(
      getGridAllCoordinates(rows.length, columns.length, projectsArrayLength)
    );
    setAnimationsArray(animationSelector(projectsArrayLength));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = {
    width: `${gridWidth}px`,
    height: `${gridHeight}px`,
  };

  return (
    <>
      <div
        className='game mt-4'
        style={{ height: gridHeight + 1, width: gridWidth + 1 }}>
        <Container fluid className='grid-container' style={style}>
          {rows.map((_el, i) => {
            const row = `R${i + 1}`;
            return (
              <Row key={row} id={row}>
                {columns.map((_el, j) => {
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
