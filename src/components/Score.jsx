function ScoreComponent({ score, data }) {
  return (
    <p className='score'>
      {score} / {data.length}
    </p>
  );
}

export default ScoreComponent;
