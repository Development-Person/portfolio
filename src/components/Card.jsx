function CardComponent(props) {
  return (
    <div className='card' style={props.style}>
      {props.name}
    </div>
  );
}

export default CardComponent;
