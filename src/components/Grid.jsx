import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { placeElementsIntoGridSpots } from '../functions/gridPlacement';
import DotComponent from './Dot';
import { data } from '../content/project_descriptions';

function GridComponent(props) {
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };

  // determining number of rows based on screen size
  const columnsDivisor = props.height > 740 ? 120 : 60;
  const columns = Array.from(
    Array(Math.floor(props.height / columnsDivisor)).keys()
  );
  const rows = Array.from(Array(Math.floor(props.width / 200)).keys());

  //placing all elements into grid on page load
  useEffect(() => {
    placeElementsIntoGridSpots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className='grid-container' style={style}>
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
                  <div id={column} className='empty box p-3 m-3'></div>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
}

export default GridComponent;
