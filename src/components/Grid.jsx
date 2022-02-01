import { Container, Row, Col } from 'react-bootstrap';
import DotComponent from './Dot';

function GridComponent(props) {
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };

  return (
    <Container fluid className='grid-container' style={style}>
      {props.rows.map((_el, i) => {
        const row = `R${i + 1}`;
        return (
          <Row key={row} id={row}>
            {props.columns.map((_el, j) => {
              const column = `${row}C${j + 1}`;
              const animation = `dot-animation${Math.ceil(Math.random() * 7)}`;
              return (
                <Col
                  key={column}
                  style={{ display: 'flex', justifyContent: 'center' }}>
                  <div id={column} className='empty box p-3 m-3'>
                    {props.coordinatesArray &&
                    props.coordinatesArray.includes(column) ? (
                      <DotComponent animation={animation} />
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
  );
}

export default GridComponent;
