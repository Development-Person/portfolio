function CardComponent({ data }) {
  return (
    <div className='card'>
      <h2>{data.name}</h2>
      <div>{data.description}</div>
    </div>
  );
}

export default CardComponent;
