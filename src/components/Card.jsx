function CardComponent({ data }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2>{data.name}</h2>
        <div className='close-button'>X</div>
      </div>
      <h5>{data.date}</h5>
      <div>{data.description}</div>
    </div>
  );
}

export default CardComponent;
